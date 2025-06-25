import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://bjgubshtkqssmrshopzr.supabase.co/'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqZ3Vic2h0a3Fzc21yc2hvcHpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4NjMwNzUsImV4cCI6MjA2NjQzOTA3NX0.W2r4b5bheV2rmh0h8ivUWtYfhlvQV9Ya6z5fwmPU1Ik'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)