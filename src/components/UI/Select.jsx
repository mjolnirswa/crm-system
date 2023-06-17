import Select from 'react-select';

const SelectActive = (props) => {

    const options = [
        { value: 'Активный', label: 'Активный' },
        { value: 'Неактивный', label: 'Неактивный' },
    ]

    return (
        <>
            <label 
            className="block pl-3 ml-px text-sm font-medium text-gray-700"
            hidden={true}
            >
                Статус заказа
            </label>

            <div className="w-48 rounded-xl">
                <Select 
                options={options} 
                defaultValue={props.value}
                onChange={props.onChange}
                autosize={false}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? 'purple' : 'grey',
                        
                      }),
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary25: 'neutral20',
                      primary: 'gray',
                    },
                })}
                />
            </div>
        </>
    )
}

export default SelectActive;