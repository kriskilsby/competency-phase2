-- SELECT COUNT(*) 
-- FROM competency_data.employee
-- WHERE e_mreview IS NOT NULL;

-- SELECT * FROM competency_data.employee;

-- SELECT * FROM competency_data.employee_project_experience;

-- SELECT * FROM competency_data.employment_history;

-- SELECT * FROM competency_data.cpd;

-- SELECT * FROM competency_data.qualifications;

-- Total Employees with Qualifications
-- SELECT COUNT(DISTINCT e_id)
-- FROM competency_data.qualifications
-- WHERE q_active = true;

-- Approved Qualifications
-- SELECT COUNT(DISTINCT e_id)
-- FROM competency_data.qualifications
-- WHERE q_active = true
-- AND q_mreview > q_ereview;

-- Awaiting Approval (optional but useful)
-- SELECT COUNT(DISTINCT e_id)
-- FROM competency_data.qualifications
-- WHERE q_active = true
-- AND (
--     q_mreview IS NULL
--     OR q_ereview > q_mreview
-- );

-- -- Total
-- SELECT COUNT(DISTINCT e_id)
-- FROM competency_data.qualifications
-- WHERE q_active = true;

-- -- Approved
-- SELECT COUNT(DISTINCT e_id)
-- FROM competency_data.qualifications
-- WHERE q_active = true
-- AND q_mreview > q_ereview;

-- SELECT COUNT(DISTINCT e_id)
-- FROM competency_data.employee_project_experience
-- WHERE epe_active = true;

-- SELECT COUNT(DISTINCT e_id)
-- FROM competency_data.employee_project_experience
-- WHERE epe_active = true
-- AND epe_manager_reviewed_at > epe_employee_reviewed_at;

-- Employees
-- WITH top_employees AS (
--   SELECT e_id
--   FROM competency_data.employee
--   WHERE e_active = true
--   ORDER BY e_id ASC
--   LIMIT 2
-- )
-- UPDATE competency_data.employee
-- SET e_mreview = NOW() + interval '1 hour'
-- WHERE e_id IN (SELECT e_id FROM top_employees);

-- Employment History
WITH top_eh AS (
  SELECT eh_id
  FROM competency_data.employment_history
  WHERE eh_active = true
  ORDER BY eh_id ASC
  LIMIT 2
)
UPDATE competency_data.employment_history
SET eh_mreview = NOW() + interval '1 hour'
WHERE eh_id IN (SELECT eh_id FROM top_eh);

-- Qualifications
WITH top_qual AS (
  SELECT q_id
  FROM competency_data.qualifications
  WHERE q_active = true
  ORDER BY q_id ASC
  LIMIT 2
)
UPDATE competency_data.qualifications
SET q_mreview = NOW() + interval '1 hour'
WHERE q_id IN (SELECT q_id FROM top_qual);

-- Project Experience
WITH top_proj AS (
  SELECT epe_id
  FROM competency_data.employee_project_experience
  WHERE epe_active = true
  ORDER BY epe_id ASC
  LIMIT 2
)
UPDATE competency_data.employee_project_experience
SET epe_manager_reviewed_at = NOW() + interval '1 hour'
WHERE epe_id IN (SELECT epe_id FROM top_proj);

-- CPD
WITH top_cpd AS (
  SELECT cpd_id
  FROM competency_data.cpd
  WHERE cpd_active = true
  ORDER BY cpd_id ASC
  LIMIT 2
)
UPDATE competency_data.cpd
SET cpd_mreview = NOW() + interval '1 hour'
WHERE cpd_id IN (SELECT cpd_id FROM top_cpd);