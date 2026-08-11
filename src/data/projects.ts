import type { Project } from "@/types/portfolio";

const screenshot = (path: string, alt: string) => ({ src: path, alt });

const ptcWorkWiseScreens = [
  "01_landing_page_ui.png",
  "02_login_page_ui.png",
  "03_create_account_page_ui.png",
  "04_forgot_password_page_ui.png",
  "05_hr_dashboard_ui.png",
  "06_hr_manage_accounts_ui.png",
  "07_hr_create_user_form_ui.png",
  "08_hr_pending_account_approval_ui.png",
  "09_hr_total_employees_ui.png",
  "10_hr_employee_201_file_ui.png",
  "11_hr_departments_list_ui.png",
  "12_hr_manage_department_ui.png",
  "13_hr_announcements_ui.png",
  "14_hr_documents_ui.png",
  "15_hr_request_document_ui.png",
  "16_hr_upload_document_ui.png",
  "17_hr_document_view_ui.png",
  "18_hr_reports_ui.png",
  "19_hr_request_report_ui.png",
  "20_hr_report_view_ui.png",
  "21_hr_faculty_load_schedule_ui.png",
  "22_hr_tasks_reminders_ui.png",
  "23_hr_create_task_ui.png",
  "24_hr_task_calendar_ui.png",
  "25_hr_chat_ui.png",
  "26_dean_dashboard_ui.png",
  "27_dean_announcements_ui.png",
  "28_dean_department_overview_ui.png",
  "29_dean_manage_professors_ui.png",
  "30_dean_documents_ui.png",
  "31_dean_request_document_ui.png",
  "32_dean_upload_document_ui.png",
  "33_dean_reports_ui.png",
  "34_dean_upload_report_ui.png",
  "35_dean_schedule_dashboard_ui.png",
  "36_dean_create_schedule_ui.png",
  "37_dean_curriculum_manager_ui.png",
  "38_dean_schedule_view_ui.png",
  "39_dean_schedule_sheet_ui.png",
  "40_dean_availability_ui.png",
  "41_dean_tasks_ui.png",
  "42_dean_task_calendar_ui.png",
  "43_dean_chat_ui.png",
  "44_dean_profile_ui.png",
  "45_dean_change_password_ui.png",
  "46_employee_dashboard_ui.png",
  "47_employee_announcements_ui.png",
  "48_employee_departments_ui.png",
  "49_employee_department_view_ui.png",
  "50_employee_documents_ui.png"
].map((file) => screenshot(`/assets/projects/ptc-workwise/${file}`, `PTC WorkWise ${file.replace(/[_-]/g, " ").replace(".png", "")}`));

const lakbayGoScreens = [
  "01-home.png",
  "02-travel-packages.png",
  "03-destination.png",
  "04-contact.png",
  "05-login.png",
  "06-create-account.png",
  "07-package-details-boracay.png",
  "08-admin-dashboard.png",
  "09-admin-bookings.png",
  "10-admin-destinations.png",
  "11-admin-packages.png",
  "12-admin-reports.png",
  "13-admin-inquiries.png",
  "14-admin-settings.png",
  "15-customer-dashboard.png",
  "16-customer-book-new-trip.png",
  "17-customer-my-profile.png"
].map((file) => screenshot(`/assets/projects/lakbaygo/${file}`, `LakbayGo ${file.replace(/[-_]/g, " ").replace(".png", "")}`));

export const projects: Project[] = [
  {
    title: "PTC WorkWise",
    slug: "ptc-workwise",
    category: "HR and Employee Portal",
    summary:
      "A live role-based portal for HR, dean, and employee workflows at Pateros Technological College.",
    description:
      "PTC WorkWise brings together account requests, employee records, documents, reports, schedules, tasks, announcements, and role-based communication in one workspace.",
    problem:
      "HR, dean, and employee tasks can become scattered across manual files, separate conversations, and repeated document requests, making it harder to track approvals, schedules, reports, and account access.",
    solution:
      "The system organizes those workflows into role-based dashboards with account management, documents, reports, schedules, tasks, announcements, and communication tools so each user sees the actions and records relevant to their role.",
    customizable:
      "Can be customized for other schools, offices, HR departments, approval flows, employee record structures, document categories, and role permissions.",
    images: ptcWorkWiseScreens,
    focus: [
      "Role-based access",
      "HR workflows",
      "Documents and reports",
      "Scheduling",
      "Task management"
    ],
    liveUrl: "https://ptcworkwise.com/",
    featured: true
  },
  {
    title: "LakbayGo Travel & Tours",
    slug: "lakbaygo",
    category: "Travel Booking System",
    summary:
      "A travel booking system for browsing local and international packages with admin and customer views.",
    description:
      "LakbayGo supports package browsing, destination pages, customer booking flows, payment upload, inquiries, and admin management screens for bookings, destinations, packages, reports, and settings.",
    problem:
      "Travel package inquiries and bookings can be difficult to manage when customers browse information in one place while admins handle bookings, package updates, payment proof, and reports elsewhere.",
    solution:
      "LakbayGo connects the customer-facing travel pages with booking forms, payment upload, customer dashboards, and admin tools for managing destinations, packages, bookings, inquiries, reports, and settings.",
    customizable:
      "Can be customized for travel agencies, tour operators, hotel packages, local destination catalogs, booking rules, payment methods, and admin reporting needs.",
    images: lakbayGoScreens,
    focus: [
      "Travel packages",
      "Booking flow",
      "Customer dashboard",
      "Admin dashboard",
      "Inquiry management"
    ],
    featured: true
  },
  {
    title: "BookEase PH",
    slug: "bookease",
    category: "Appointment Booking Experience",
    summary:
      "A booking interface for Philippine service businesses such as salons, wellness studios, and grooming centers.",
    description:
      "BookEase PH presents a client booking flow and owner-facing appointment console with local pricing, scheduling, and demo access screens.",
    problem:
      "Small service businesses often rely on chats or manual notes for appointments, which can make available slots, customer details, pricing, and owner-side schedule tracking harder to manage.",
    solution:
      "BookEase PH provides a clean booking flow for customers and an appointment-focused interface for owners so services, schedules, demo access, and local pricing can be presented clearly.",
    customizable:
      "Can be customized for salons, barbershops, wellness studios, clinics, repair services, class bookings, staff schedules, service menus, and local pricing formats.",
    images: [
      screenshot("/assets/projects/bookease/bookease-home.png", "BookEase PH home page"),
      screenshot("/assets/projects/bookease/bookease-booking.png", "BookEase PH booking page")
    ],
    focus: [
      "Appointment booking",
      "Service business UI",
      "Admin demo",
      "Responsive layout"
    ],
    liveUrl: "https://book-ease-demo.vercel.app/",
    featured: true
  },
  {
    title: "Codexa Cafe Kiosk",
    slug: "codexa-cafe",
    category: "Tablet Ordering Demo",
    summary:
      "A cafe ordering demo with secure entry screens and separate demo account paths.",
    description:
      "Codexa Cafe presents a premium tablet ordering flow for customer, staff, and admin demo access, with a simple interface for local ordering scenarios.",
    problem:
      "Cafe ordering demos need a clear entry point for different roles without making the interface feel crowded or confusing for customers, staff, and admins.",
    solution:
      "The kiosk demo uses a focused tablet-style sign-in and role-based demo account paths so users can quickly enter the right ordering or management experience.",
    customizable:
      "Can be customized for cafes, small restaurants, food kiosks, tablet ordering flows, role-based demos, menu categories, and staff/admin access screens.",
    images: [
      screenshot("/assets/projects/codexa-cafe/codexa-cafe-login.png", "Codexa Cafe sign in page")
    ],
    focus: ["Cafe ordering", "Demo accounts", "Tablet UI", "Admin access"],
    liveUrl: "https://caffe-kiosk.vercel.app/"
  }
];

export const featuredProjects = projects.filter((project) => project.featured);
export const otherProjects = projects.filter((project) => !project.featured);
