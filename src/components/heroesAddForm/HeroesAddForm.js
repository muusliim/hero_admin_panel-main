import { useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import {selectAll} from '../heroesFilters/filtersSlice';
import { useCreateHeroMutation } from "../../api/apiSlice";



const HeroesAddForm = () => {
    const [heroName, setHeroName] = useState('');
    const [heroDescr, setHeroDescr] = useState('');
    const [heroElement, setHeroElement] = useState('');

    const [createHero, {isLoading, isError}] = useCreateHeroMutation(); 
 
    const {filtersLoadingStatus} = useSelector(state => state.filters);
    const filters = useSelector(selectAll);

    const onSubmitNewHero = (e) => {
        e.preventDefault();

        const newHero = {
            id: uuidv4(),
            name: heroName,
            description: heroDescr,
            element: heroElement
        }
        
        createHero(newHero).unwrap();

        setHeroDescr('');
        setHeroName('');
        setHeroElement('');
    }

    const renderFilters = (filters, status) => {
        if (isLoading) {
            return <option>Loading...</option>
        } else if (isError) {
            return <option>ERROR</option>
        }

        if (filters && filters.length > 0 ){
            return filters.map(({name, label}) => {
             // eslint-disable-next-line
                if (name === 'all') return;

            return <option key={name} value={name}>{label}</option>
            })
        }
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitNewHero}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    value={heroName}
                    className="form-control" 
                    id="name"
                    placeholder="Как меня зовут?"
                    onChange={(e) => setHeroName(e.target.value)}
                    />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    value={heroDescr}
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    onChange={(e) => setHeroDescr(e.target.value)}
                    />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select"
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value)} 
                    id="element" 
                    name="element">
                    <option value='' >Я владею элементом...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;