-- Create threats table
CREATE TABLE public.threats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL,
  source TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'blocked', 'investigating')),
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create traffic_logs table
CREATE TABLE public.traffic_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  source_ip TEXT NOT NULL,
  destination_ip TEXT NOT NULL,
  protocol TEXT NOT NULL,
  port INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('allowed', 'blocked', 'suspicious')),
  data_size TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create system_components table
CREATE TABLE public.system_components (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL CHECK (status IN ('operational', 'warning', 'critical')),
  details TEXT,
  last_checked TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create attack_summary table
CREATE TABLE public.attack_summary (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  total_attacks INTEGER NOT NULL DEFAULT 0,
  blocked_attacks INTEGER NOT NULL DEFAULT 0,
  critical_threats INTEGER NOT NULL DEFAULT 0,
  avg_response_time INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(date)
);

-- Enable Row Level Security
ALTER TABLE public.threats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.traffic_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attack_summary ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (since there's no auth)
CREATE POLICY "Allow public read access on threats" 
ON public.threats FOR SELECT USING (true);

CREATE POLICY "Allow public read access on traffic_logs" 
ON public.traffic_logs FOR SELECT USING (true);

CREATE POLICY "Allow public read access on system_components" 
ON public.system_components FOR SELECT USING (true);

CREATE POLICY "Allow public read access on attack_summary" 
ON public.attack_summary FOR SELECT USING (true);

-- Insert initial system components
INSERT INTO public.system_components (name, status, details) VALUES
('Network Scanner', 'operational', 'Last checked: Just now'),
('Traffic Analyzer', 'operational', 'Last checked: Just now'),
('Threat Intelligence', 'operational', 'Last checked: Just now'),
('Anomaly Detection', 'warning', 'Last checked: Just now'),
('Log Management', 'operational', 'Last checked: Just now');

-- Insert initial attack summary for today
INSERT INTO public.attack_summary (date, total_attacks, blocked_attacks, critical_threats, avg_response_time)
VALUES (CURRENT_DATE, 0, 0, 0, 2);

-- Create function to update attack summary
CREATE OR REPLACE FUNCTION update_attack_summary()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.attack_summary (date, total_attacks, blocked_attacks, critical_threats)
  VALUES (
    CURRENT_DATE,
    1,
    CASE WHEN NEW.status = 'blocked' THEN 1 ELSE 0 END,
    CASE WHEN NEW.severity = 'critical' THEN 1 ELSE 0 END
  )
  ON CONFLICT (date) 
  DO UPDATE SET
    total_attacks = attack_summary.total_attacks + 1,
    blocked_attacks = attack_summary.blocked_attacks + CASE WHEN NEW.status = 'blocked' THEN 1 ELSE 0 END,
    critical_threats = attack_summary.critical_threats + CASE WHEN NEW.severity = 'critical' THEN 1 ELSE 0 END,
    updated_at = now();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update attack summary
CREATE TRIGGER update_attack_summary_trigger
AFTER INSERT ON public.threats
FOR EACH ROW
EXECUTE FUNCTION update_attack_summary();

-- Enable realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.threats;
ALTER PUBLICATION supabase_realtime ADD TABLE public.traffic_logs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.system_components;
ALTER PUBLICATION supabase_realtime ADD TABLE public.attack_summary;