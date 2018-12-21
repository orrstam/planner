const helpers = {
  getOptionsFromTypes: (types: Array<Planner.TaskTypes.Type>): Array<Planner.Tasks.Forms.Option> => {
    let options: any = [];

    types.map((type, index) => {
      options[index] = {
        value: type._id,
        label: type.name
      };
    })

    return options;
  }
}

export default helpers;
