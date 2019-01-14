import * as React from 'react';
import Select from 'react-select';
import helpers from '../services/helpers';
import theme from '../config/theme';
import { TaskStore } from 'src/stores';
import { Box } from '../components/layout';

interface IFilterProps {
  types: Planner.TaskTypes.Type[],
  taskStore: TaskStore
}

export default class Filter extends React.Component<IFilterProps> {
  handleChange = (e: any): void => {
    if (e.length) {
      this.props.taskStore.filters = e;
      this.props.taskStore.filter();
    } else {
      this.props.taskStore.filters = [];
    }
  }

  public render() {
    return(
      <TypesSelect filters={this.props.taskStore.filters} options={helpers.getOptionsFromTypes(this.props.types)} handleChange={this.handleChange} />
    )
  }
}

interface ITypesSelectProps {
  options: Planner.Tasks.Forms.Option[],
  handleChange: (e: Planner.Tasks.Forms.Option) => void,
  filters: Planner.Tasks.Forms.Option[]
}

const TypesSelect: React.StatelessComponent<ITypesSelectProps> = ({
  options,
  handleChange,
  filters
}) => {
  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      color: state.isSelected ? 'rgba(149, 195, 141, 0.75)' : '#333',
      backgroundColor: state.isSelected ? '#fff' : '#fff'
    }),
    control: (base: any) => ({
      ...base,
      padding: 5,
      boxShadow: '1px 4px 15px -2px #ccc',
      margin: '30px 0'
    }),
    multiValueRemove: (base: any, data: any) => ({
      ...base,
      backgroundColor: `rgba(${theme.taskTypes.colors[data.data.label]}, .5)`,
      ':hover': {
        backgroundColor: `rgba(${theme.taskTypes.colors[data.data.label]}, 1)`,
        color: '#333',
      },
    }),
    multiValue: (styles: any, data: any ) => {
      const color = theme.taskTypes.colors[data.data.label];

      return {
        ...styles,
        backgroundColor: `rgba(${color}, .75)`,
      };
    },
  };

  return (
    <Box width="50%">
      <Select
        isMulti={true}
        options={options}
        onChange={handleChange}
        styles={customStyles}
        value={(filters.length) ? filters.slice() : []}
      />
    </Box>
  )
}
