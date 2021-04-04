import { INavData } from "@coreui/angular";

export const adminNavItems: INavData[] = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: "icon-speedometer",
  },
  {
    title: true,
    name: "Generate",
  },
  {
    name: "Question",
    url: "/question",
    icon: "icon-layers",
    children: [
      {
        name: "Add",
        url: "/question/add",
        icon: "icon-layers",
      },
    ],
  },
  {
    name: "Question Paper",
    url: "/question-paper",
    icon: "icon-pencil",
    children: [
      {
        name: "Add",
        url: "/question-paper/add",
        icon: "icon-pencil",
      },
      {
        name: "View",
        url: "/question-paper/view",
        icon: "icon-pencil",
      },
    ],
  },
  {
    title: true,
    name: "ADD",
  },
  {
    name: "Exam",
    url: "/exam-name",
    icon: "icon-note",
    children: [
      {
        name: "Add",
        url: "/exam-name/add",
        icon: "icon-note",
      },
      {
        name: "List",
        url: "/exam-name/list",
        icon: "icon-note",
      },
    ],
  },
  {
    name: "Department",
    url: "/department",
    icon: "icon-calculator",
    children: [
      {
        name: "Add",
        url: "/department/add",
        icon: "icon-calculator",
      },
      {
        name: "List",
        url: "/department/list",
        icon: "icon-calculator",
      },
    ],
  },
  {
    name: "Semester",
    url: "/semester",
    icon: "icon-star",
    children: [
      {
        name: "Add",
        url: "/semester/add",
        icon: "icon-star",
      },
      {
        name: "List",
        url: "/semester/list",
        icon: "icon-star",
      },
    ],
  },
  {
    name: "Subject",
    url: "/subject",
    icon: "icon-cursor",
    children: [
      {
        name: "Add",
        url: "/subject/add",
        icon: "icon-cursor",
      },
      {
        name: "List",
        url: "/subject/list",
        icon: "icon-cursor",
      },
    ],
  },
  {
    name: "Question Type",
    url: "/question-type",
    icon: "icon-puzzle",
    children: [
      {
        name: "Add",
        url: "/question-type/add",
        icon: "icon-puzzle",
      },
      {
        name: "List",
        url: "/question-type/list",
        icon: "icon-puzzle",
      },
    ],
  },
  {
    title: true,
    name: "More",
  },
  {
    name: "Register",
    url: "/register",
    icon: "icon-user-follow",
  }
];

export const teacherNavItems: INavData[] = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: "icon-speedometer",
  },
  {
    title: true,
    name: "Generate",
  },
  {
    name: "Question",
    url: "/question",
    icon: "icon-layers",
    children: [
      {
        name: "Add",
        url: "/question/add",
        icon: "icon-layers",
      },
    ],
  },
  {
    name: "Question Paper",
    url: "/question-paper",
    icon: "icon-pencil",
    children: [
      {
        name: "Add",
        url: "/question-paper/add",
        icon: "icon-pencil",
      }
    ],
  },
  {
    title: true,
    name: "ADD",
  },
  {
    name: "Exam",
    url: "/exam-name",
    icon: "icon-note",
    children: [
      {
        name: "Add",
        url: "/exam-name/add",
        icon: "icon-note",
      },
      {
        name: "List",
        url: "/exam-name/list",
        icon: "icon-note",
      },
    ],
  },
  {
    name: "Department",
    url: "/department",
    icon: "icon-calculator",
    children: [
      {
        name: "Add",
        url: "/department/add",
        icon: "icon-calculator",
      },
      {
        name: "List",
        url: "/department/list",
        icon: "icon-calculator",
      },
    ],
  },
  {
    name: "Semester",
    url: "/semester",
    icon: "icon-star",
    children: [
      {
        name: "Add",
        url: "/semester/add",
        icon: "icon-star",
      },
      {
        name: "List",
        url: "/semester/list",
        icon: "icon-star",
      },
    ],
  },
  {
    name: "Subject",
    url: "/subject",
    icon: "icon-cursor",
    children: [
      {
        name: "Add",
        url: "/subject/add",
        icon: "icon-cursor",
      },
      {
        name: "List",
        url: "/subject/list",
        icon: "icon-cursor",
      },
    ],
  },
  {
    name: "Question Type",
    url: "/question-type",
    icon: "icon-puzzle",
    children: [
      {
        name: "Add",
        url: "/question-type/add",
        icon: "icon-puzzle",
      },
      {
        name: "List",
        url: "/question-type/list",
        icon: "icon-puzzle",
      },
    ],
  },
  {
    title: true,
    name: "More",
  },
  {
    name: "Register",
    url: "/register",
    icon: "icon-user-follow",
  }
];

export const studentNavItems: INavData[] = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: "icon-speedometer",
  },
];
