-- 3PN CAD Diagnostic Database Schema
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard → SQL Editor)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Assessments table (CAD Quadrant model)
CREATE TABLE IF NOT EXISTS public.assessments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  quadrant INTEGER NOT NULL CHECK (quadrant BETWEEN 1 AND 4),
  pathway TEXT NOT NULL,
  responses JSONB NOT NULL,
  cad_results JSONB NOT NULL,
  ai_insights JSONB,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;

-- Assessments policies
CREATE POLICY "Users can view own assessments"
  ON public.assessments
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own assessments"
  ON public.assessments
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Mentor matches table
CREATE TABLE IF NOT EXISTS public.mentor_matches (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  mentee_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  mentor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.mentor_matches ENABLE ROW LEVEL SECURITY;

-- Mentor matches policies
CREATE POLICY "Users can view their matches"
  ON public.mentor_matches
  FOR SELECT
  USING (auth.uid() = mentee_id OR auth.uid() = mentor_id);

CREATE POLICY "Mentees can create matches"
  ON public.mentor_matches
  FOR INSERT
  WITH CHECK (auth.uid() = mentee_id);

CREATE POLICY "Participants can update matches"
  ON public.mentor_matches
  FOR UPDATE
  USING (auth.uid() = mentee_id OR auth.uid() = mentor_id);

-- Function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NULL)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update profiles.updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger to update mentor_matches.updated_at
DROP TRIGGER IF EXISTS update_mentor_matches_updated_at ON public.mentor_matches;
CREATE TRIGGER update_mentor_matches_updated_at
  BEFORE UPDATE ON public.mentor_matches
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_assessments_user_id ON public.assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_assessments_quadrant ON public.assessments(quadrant);
CREATE INDEX IF NOT EXISTS idx_assessments_completed_at ON public.assessments(completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_mentor_matches_mentee_id ON public.mentor_matches(mentee_id);
CREATE INDEX IF NOT EXISTS idx_mentor_matches_mentor_id ON public.mentor_matches(mentor_id);
CREATE INDEX IF NOT EXISTS idx_mentor_matches_status ON public.mentor_matches(status);

-- =============================================
-- NOTIFICATIONS TABLE (Admin alerts + User notifications)
-- =============================================
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN (
    'welcome', 'assessment_complete', 'milestone_achieved',
    'admin_new_signup', 'admin_new_assessment', 'progress_update', 'system'
  )),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  read BOOLEAN DEFAULT FALSE,
  for_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Users can see their own notifications; admins can see admin notifications
CREATE POLICY "Users can view own notifications"
  ON public.notifications FOR SELECT
  USING (
    auth.uid() = user_id
    OR (for_admin = TRUE AND auth.jwt() ->> 'email' IN (
      SELECT unnest(string_to_array(current_setting('app.admin_emails', true), ','))
    ))
  );

CREATE POLICY "Users can update own notifications"
  ON public.notifications FOR UPDATE
  USING (
    auth.uid() = user_id
    OR (for_admin = TRUE AND auth.jwt() ->> 'email' IN (
      SELECT unnest(string_to_array(current_setting('app.admin_emails', true), ','))
    ))
  );

-- System can insert notifications (via triggers)
CREATE POLICY "System can insert notifications"
  ON public.notifications FOR INSERT
  WITH CHECK (TRUE);

-- =============================================
-- MILESTONES TABLE (User achievements & progress)
-- =============================================
CREATE TABLE IF NOT EXISTS public.milestones (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN (
    'first_assessment', 'quadrant_upgrade', 'consistency_streak',
    'all_pillars_above_50', 'readiness_above_75', 'reached_q4',
    'assessment_count_5', 'assessment_count_10', 'shared_results'
  )),
  title TEXT NOT NULL,
  description TEXT,
  achieved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'
);

ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own milestones"
  ON public.milestones FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert milestones"
  ON public.milestones FOR INSERT
  WITH CHECK (TRUE);

-- =============================================
-- EMAIL PREFERENCES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS public.email_preferences (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  welcome_email BOOLEAN DEFAULT TRUE,
  assessment_results BOOLEAN DEFAULT TRUE,
  progress_updates BOOLEAN DEFAULT TRUE,
  milestone_alerts BOOLEAN DEFAULT TRUE,
  weekly_digest BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.email_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own email preferences"
  ON public.email_preferences FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own email preferences"
  ON public.email_preferences FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own email preferences"
  ON public.email_preferences FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Trigger to update email_preferences.updated_at
DROP TRIGGER IF EXISTS update_email_prefs_updated_at ON public.email_preferences;
CREATE TRIGGER update_email_prefs_updated_at
  BEFORE UPDATE ON public.email_preferences
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================
-- AUTO-NOTIFICATION TRIGGERS
-- =============================================

-- Notify admin when a new user signs up
CREATE OR REPLACE FUNCTION public.notify_admin_new_signup()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.notifications (user_id, type, title, message, for_admin, metadata)
  VALUES (
    NEW.id,
    'admin_new_signup',
    'New User Signed Up',
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email) || ' just joined 3PN!',
    TRUE,
    jsonb_build_object('email', NEW.email, 'name', COALESCE(NEW.raw_user_meta_data->>'full_name', ''))
  );

  -- Also create welcome notification for the user
  INSERT INTO public.notifications (user_id, type, title, message, for_admin)
  VALUES (
    NEW.id,
    'welcome',
    'Welcome to 3PN! 🎉',
    'Welcome to 3PN — Prepare, Progress, and Prosper Network! Start your Mastery Voyage by taking the CAD Diagnostic assessment.',
    FALSE
  );

  -- Create default email preferences
  INSERT INTO public.email_preferences (id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_new_user_notify ON auth.users;
CREATE TRIGGER on_new_user_notify
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.notify_admin_new_signup();

-- Notify admin when assessment is completed
CREATE OR REPLACE FUNCTION public.notify_admin_new_assessment()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.notifications (user_id, type, title, message, for_admin, metadata)
  VALUES (
    NEW.user_id,
    'admin_new_assessment',
    'New Assessment Completed',
    'A user completed the CAD Diagnostic and landed in Quadrant ' || NEW.quadrant || ' (' || NEW.pathway || ')',
    TRUE,
    jsonb_build_object('quadrant', NEW.quadrant, 'pathway', NEW.pathway,
      'readiness', COALESCE((NEW.cad_results->>'readinessForQ4')::numeric, 0))
  );

  -- Notify the user too
  INSERT INTO public.notifications (user_id, type, title, message, for_admin, metadata)
  VALUES (
    NEW.user_id,
    'assessment_complete',
    'Assessment Complete! 🎯',
    'Great job! You''re in Quadrant ' || NEW.quadrant || '. Check your dashboard for detailed insights and next steps.',
    FALSE,
    jsonb_build_object('quadrant', NEW.quadrant, 'pathway', NEW.pathway)
  );

  -- Award "First Assessment" milestone if this is their first
  IF NOT EXISTS (
    SELECT 1 FROM public.milestones
    WHERE user_id = NEW.user_id AND type = 'first_assessment'
  ) THEN
    INSERT INTO public.milestones (user_id, type, title, description)
    VALUES (
      NEW.user_id,
      'first_assessment',
      'First Step Taken 🚀',
      'You completed your first CAD Diagnostic assessment!'
    );
  END IF;

  -- Award "Reached Q4" milestone
  IF NEW.quadrant = 4 AND NOT EXISTS (
    SELECT 1 FROM public.milestones
    WHERE user_id = NEW.user_id AND type = 'reached_q4'
  ) THEN
    INSERT INTO public.milestones (user_id, type, title, description)
    VALUES (
      NEW.user_id,
      'reached_q4',
      'Mastery Achieved! 👑',
      'You have reached Quadrant 4: Mastery — Command + System!'
    );
  END IF;

  -- Award milestone for readiness above 75%
  IF (NEW.cad_results->>'readinessForQ4')::numeric >= 75
     AND NOT EXISTS (
       SELECT 1 FROM public.milestones
       WHERE user_id = NEW.user_id AND type = 'readiness_above_75'
     ) THEN
    INSERT INTO public.milestones (user_id, type, title, description)
    VALUES (
      NEW.user_id,
      'readiness_above_75',
      'Almost There! 💪',
      'Your readiness for Mastery is above 75%!'
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_assessment_complete ON public.assessments;
CREATE TRIGGER on_assessment_complete
  AFTER INSERT ON public.assessments
  FOR EACH ROW EXECUTE FUNCTION public.notify_admin_new_assessment();

-- Indexes for notifications and milestones
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_for_admin ON public.notifications(for_admin) WHERE for_admin = TRUE;
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_milestones_user_id ON public.milestones(user_id);
CREATE INDEX IF NOT EXISTS idx_milestones_type ON public.milestones(type);

COMMENT ON TABLE public.profiles IS 'User profile information extending auth.users';
COMMENT ON TABLE public.assessments IS 'CAD Diagnostic assessment results with AI insights';
COMMENT ON TABLE public.mentor_matches IS 'Mentor-mentee matching relationships';
COMMENT ON TABLE public.notifications IS 'User and admin notifications with auto-triggers';
COMMENT ON TABLE public.milestones IS 'User achievement milestones for progress tracking';
COMMENT ON TABLE public.email_preferences IS 'User email notification preferences';
