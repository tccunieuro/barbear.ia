-- Enable Row Level Security on unprotected tables
ALTER TABLE public."Tools_Modelo" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Leads_Modelo" ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for Tools_Modelo (assuming these should be publicly readable but not writable)
CREATE POLICY "Tools are publicly readable" ON public."Tools_Modelo"
FOR SELECT USING (true);

-- Create RLS policies for Leads_Modelo (assuming these should be restricted to authenticated users)
CREATE POLICY "Authenticated users can view leads" ON public."Leads_Modelo"
FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert leads" ON public."Leads_Modelo"
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update leads" ON public."Leads_Modelo"
FOR UPDATE USING (auth.role() = 'authenticated');