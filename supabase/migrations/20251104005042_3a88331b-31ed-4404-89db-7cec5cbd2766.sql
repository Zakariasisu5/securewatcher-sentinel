-- Add insert policies for demo purposes (allowing anyone to add data)
CREATE POLICY "Allow public insert on threats" 
ON public.threats FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert on traffic_logs" 
ON public.traffic_logs FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update on system_components" 
ON public.system_components FOR UPDATE USING (true);

CREATE POLICY "Allow public update on attack_summary" 
ON public.attack_summary FOR UPDATE USING (true);