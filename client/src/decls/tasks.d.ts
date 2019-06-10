declare namespace Planner.Tasks {
  interface Task {
    _id?: string,
    title: string,
    text: string,
    types: Planner.TaskTypes.Type[]
    deleted?: boolean,
    created?: any
  }
  interface Icon {
    icon: string,
    onClick?: () => any
  }
}

declare namespace Planner.Tasks.Forms {
  interface SubmitValues {
    _id?: string,
    title: string,
    text: string,
    types: any
  }
  interface Option {
    value: string,
    label?: string,
    length?: number,
    style?: Object
  }
}

declare namespace Planner.TaskTypes {
  interface Type {
    _id: string,
    name: string
  }
}

declare namespace Planner.Users.Forms {
  interface RegisterValues {
    username: string,
    password?: string
  }
  interface SubmitValues {
    username: string,
    password: string
  }
}