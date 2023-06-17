import { RxCross1 } from "react-icons/rx";
import Select from 'react-select';

const FilterModal = (props) => {
    const options = [
        { value: 'Активный', label: 'Активный' },
        { value: 'Неактивный', label: 'Неактивный' },
    ]

    return (
        <div className="w-screen h-screen bg-black bg-opacity-20 fixed top-0 right-0
        flex justify-center items-center">
            <div className="bg-white rounded-xl p-5 shadow-md w-64">
                <div className="flex justify-between">
                    <h1 className="text-xl font-normal text-black">Фильтр</h1>

                    <button 
                    className='my-auto mr-5'
                    onClick={props.onClick}
                    >
                        <RxCross1 style={{color: 'inherit', fontSize: "1.5em"}}
                        />
                    </button>
                </div>

                <h2 className="mt-2">
                    Фильтровать по активности:
                </h2>

                <div className="w-48 rounded-xl mt-2">
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
            </div>
        </div>
    )
}

export default FilterModal;