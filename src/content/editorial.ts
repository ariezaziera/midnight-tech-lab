import type { EditorialContent } from "./model";
import { validateContent } from "@/lib/content";

// Only the exact Savvyra v1.0 text has owner-approved public presentation.
export const content: EditorialContent = {
  categories: [{ id: "layout-preview", label: "Layout preview" }, { id: "development", label: "Development" }],
  projects: [{
    slug: "placeholder", title: "Placeholder case study",
    summary: "A local template preview, not real portfolio or client work.",
    status: "placeholder", categoryIds: ["layout-preview"], tools: [],
    caseStudy: {}, media: [], links: [], relatedSlugs: [],
  }, {
    "slug": "savvyra",
    "title": "Savvyra",
    "summary": "A full-stack personal finance web application that brings salary planning, transactions, savings, commitments, debts, and investments into one connected experience.",
    "status": "published",
    "approval": {
      "source": "Owner-approved Savvyra Content Packet v1.0 and explicit public-presentation decision for the HTML portfolio library; M6-B3 execution separately authorized.",
      "ownerVerified": true,
      "publicPresentationApproved": true
    },
    "categoryIds": [
      "development"
    ],
    "role": "Full-Stack Developer & UI/UX Designer",
    "projectType": "Solo Personal Project",
    "tools": [
      "Frontend: Next.js, React, TypeScript, Tailwind CSS",
      "Backend: Next.js API Routes",
      "Database: PostgreSQL (Supabase), Prisma ORM",
      "Visualization: Recharts",
      "UI & Motion: Framer Motion, Lucide React"
    ],
    "caseStudy": {
      "overview": "Personal Finance Management, Designed Around Everyday Life\n\nSavvyra is a personal finance management web application I designed and developed to make everyday financial activities easier to organize and understand.\n\nIt combines financial tracking, salary planning, savings goals, recurring commitments, debt management, and investment records with interactive dashboards that present financial information in a more accessible way.",
      "problem": "The Challenge\n\nManaging personal finances involves more than recording income and expenses.\n\nUnderstanding monthly commitments, planning salary allocations, monitoring debts, and tracking savings goals can become difficult when financial information is spread across separate records.\n\nI wanted to explore how these responsibilities could be brought together in a single, approachable interface.",
      "contribution": "My Role & Contributions\n\nAs the solo Full-Stack Developer and UI/UX Designer, I was responsible for the project's design direction, application structure, frontend development, backend integration, and iterative refinement.\n\nI incorporated AI-assisted development into my workflow while remaining responsible for reviewing suggestions, making design and technical decisions, integrating functionality, testing, and debugging.",
      "process": [
        "Design & Development Approach\n\n01. Organizing Financial Information\n\nI structured the application around distinct financial activities while maintaining a central dashboard for an overview of income, expenses, savings, debts, commitments, and investments.",
        "02. Creating a Cohesive Interface\n\nI developed a purple-themed visual identity using gradients, glass-style surfaces, interactive charts, and reusable UI components.\n\nThe interface was designed with responsive layouts to accommodate different screen sizes.",
        "03. Connecting Frontend and Backend\n\nI implemented Next.js API functionality and used Prisma ORM with PostgreSQL hosted on Supabase to manage application data.\n\nThe database schema connects user accounts with financial records across the application's different modules.",
        "04. Implementing Financial Logic\n\nI worked on functionality for salary calculations, recurring commitments, savings progress, debt records, and dashboard summaries.\n\nThe codebase also includes transaction-linked logic that updates certain debt and commitment payment states.",
        "05. Iterating and Refining\n\nThroughout development, I refined components, forms, application states, and user interactions through testing and debugging."
      ],
      "solution": "Key Features\n\n- Interactive financial dashboard and data visualization\n- Income and expense transaction management\n- Savings accounts and savings goals\n- Salary calculation and monthly financial planning\n- Recurring commitments and payment tracking\n- Debt and repayment management\n- Investment records and summaries\n- Authentication and account management",
      "outcomes": [
        {
          "text": "Outcome & Reflection\n\nSavvyra became a practical exploration of full-stack product development, combining financial data modeling, application logic, and interface design within one project.",
          "approval": {
            "source": "Owner-approved Savvyra Content Packet v1.0 and explicit public-presentation decision for the HTML portfolio library; M6-B3 execution separately authorized.",
            "ownerVerified": true,
            "publicPresentationApproved": true
          }
        },
        {
          "text": "It allowed me to work through interconnected features, organize reusable components, and refine how backend data is presented through interactive interfaces.",
          "approval": {
            "source": "Owner-approved Savvyra Content Packet v1.0 and explicit public-presentation decision for the HTML portfolio library; M6-B3 execution separately authorized.",
            "ownerVerified": true,
            "publicPresentationApproved": true
          }
        },
        {
          "text": "The project reflects my interest in building useful digital products that balance technical functionality with approachable user experiences.",
          "approval": {
            "source": "Owner-approved Savvyra Content Packet v1.0 and explicit public-presentation decision for the HTML portfolio library; M6-B3 execution separately authorized.",
            "ownerVerified": true,
            "publicPresentationApproved": true
          }
        }
      ]
    },
    "media": [],
    "links": [],
    "relatedSlugs": []
  }],
  profile: [
    { id: "introduction", title: "Personal introduction", missing: "An owner-approved introduction is still needed.", status: "draft" },
    { id: "background", title: "Professional background", missing: "Verified education and professional background have not been supplied.", status: "draft" },
    { id: "skills", title: "Skills & capabilities", missing: "An approved skills inventory is still needed.", status: "draft" },
    { id: "experience", title: "Selected experience", missing: "Experience and permission to share it await verification.", status: "draft" },
    { id: "interests", title: "Creative & technical interests", missing: "Personal interests await owner input.", status: "draft" },
    { id: "approach", title: "Working approach", missing: "A description of the working approach awaits owner approval.", status: "draft" },
  ],
  services: [], contacts: [],
};
validateContent(content);
