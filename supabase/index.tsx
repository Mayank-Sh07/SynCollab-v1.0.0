import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://bcqincllvupgnvfhfldh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxOTg1NzcwOCwiZXhwIjoxOTM1NDMzNzA4fQ.YRYiFpLIvlP-e9R0gvDIoo3_cWA1qcjThLARVrfE_58"
);
