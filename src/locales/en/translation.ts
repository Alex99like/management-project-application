const translationEn = {
  header: {
    welcome: 'Welcome',
    board: 'Create Board',
    profile: 'Edit Profile',
    language: {
      lang: 'Language',
      en: 'English',
      ru: 'Russian',
    },
    main: 'Main Page',
    logOut: 'Log Out',
  },
  welcomePage: {
    title: 'Kanban Board: Your Fast Track to Process Optimization.',
    subtitle: 'Visualize Your Workflows, Get More Done',
    info: 'Unlock the power of Kanban! Use Taskero’s Kanban boards to visualize workflows, boost team productivity and support agile project management',
    list: [
      'Keep your team focused with clear Kanban boards.',
      'Centralize requirements, visualize project progress.',
      'Communicate directly on tasks. Fewer meetings and mails.',
    ],
    getStarted: 'Get Started',
    rssTitle: 'The Rolling Scopes.',
    rssSubTitle: 'Want to find out more?',
    titles: ['Free-of-charge learning', 'Open to everyone', 'Learning materials'],
    descriptions: [
      'The RS School is working by the principle of "Pay it forward." Members of our community share their knowledge and check students’ tasks for free.',
      'Everyone can study at RS School, regardless of age, professional employment, or place of residence. However, you should have sufficient base knowledge before the program begins.',
      'School’s documentation - https://docs.rs.school. You can find all materials on the YouTube channel. Discord chat for the students.',
    ],
    learnMore: 'Learn more',
    teamTitle: 'Our Team.',
    teamSubTitle: 'Here are the developers who created this app',
    team: ['Aleksander Aleksievich', 'Anna Musikhina', 'Maryia Huchkova'],
    statuses: ['Team leader, Frontend developer', 'Frontend developer', 'Frontend developer'],
    quotes: [
      'I think, the art of programming is a little more complicated than other human skills. Programming makes you better in the same way that learning a foreign language, math, or reading books helps you develop.',
      'For a long time it was a mystery to me how something very expensive and technologically advanced could be so useless. And I soon realized that a computer is a stupid machine that has the ability to do incredibly smart things, while programmers are smart people who have a talent for doing incredibly stupid things. In short, they found each other.',
      'Programming is hard. The basic rules on which everything is built are very simple, but as the program develops, it itself begins to introduce its own rules and laws. Thus, the programmer builds a labyrinth in which he himself can get lost.',
    ],
  },
  notFoundPage: {
    title: 'The page you were looking for could not be found',
    routesWelcome: 'Go To Welcome Page',
    routesMain: 'Go To Main Page',
  },
  mainPage: {
    title: 'Your Boards',
    newBoard: 'Add New Board',
  },
  editPage: {
    delete: 'Delete Account',
    name: 'NAME: ',
    login: 'LOGIN: ',
    id: 'Your ID: ',
    update: 'Update User',
    form: {
      name: {
        placeholder: 'Name',
        required: 'Name is required',
        valid: 'Please enter a valid name',
      },
      login: {
        placeholder: 'Login',
        required: 'Login is required',
        valid: 'Please enter a valid login',
      },
      password: {
        placeholder: 'Password',
        required: 'Password is required',
        valid: 'Password length must be more than 5 elements',
      },
      title: {
        placeholder: 'Title',
        required: 'Title is required',
        valid: 'Please enter a valid title',
      },
      description: {
        placeholder: 'Description',
        required: 'Description is required',
        valid: 'Please enter a valid description',
      },
      button: {
        update: 'Update',
        create: 'Create',
        cancel: 'Cancel',
      },
      formColumn: {
        update: 'Update Column',
        create: 'Create New Column',
      },
      formTask: {
        update: 'Update Task',
        create: 'Create New Task',
      },
      update: 'UPDATE PROFILE',
    },
  },
  boardPage: {
    back: 'Back',
  },
  toastr: {
    success: 'Success!',
    mainPage: {
      create: 'Board created',
      update: 'Board updated',
    },
    boardPage: {
      create: 'Column created',
    },
    column: {
      create: 'Task created',
      update: 'Task updated',
    },
    delete: 'deleted',
    authAction: {
      completed: 'Completed successfully',
      registration: 'Registration',
      login: 'Login',
      update: 'Update',
      delete: 'Delete',
      logout: 'Logout',
      loggedOut: 'You have logged out of your account',
    },
    rtkError: 'RTK error',
    error: 'Error',
    authorization: 'Authorization',
    anyError: 'any error',
  },
  addButton: {
    add: 'Add',
    column: 'column',
    task: 'task',
  },
  column: "You don't have any tasks yet",
  formBoard: {
    update: 'Update Board',
    create: 'Create New Board',
  },
  confirmationModal: {
    board: 'All board data',
    column: 'Column',
    account: 'Account',
    task: 'Task',
    sure: 'Are you sure?',
    delete: ' will be deleted.',
    ok: 'OK',
    cancel: 'Cancel',
  },
  errorBoundary: {
    title: 'Ops, what went wrong !!!',
    tryAgain: 'You can try again',
    back: 'Go Back',
    or: 'OR',
    mainPage: 'You can return to the main page',
    welcome: 'Go Welcome',
  },
};

export default translationEn;
