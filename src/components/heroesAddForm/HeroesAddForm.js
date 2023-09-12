import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { heroCreated } from "../heroesList/heroesSlice";

import { useHttp } from "../../hooks/http.hook";


const HeroesAddForm = () => {
    const [heroName, setHeroName] = useState('');
    const [heroDescr, setHeroDescr] = useState('');
    const [heroElement, setHeroElement] = useState('');

    const {filters, filtersLoadingStatus} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const {request} = useHttp();

    const onSubmitNewHero = (e) => {
        e.preventDefault();

        const newHeroList = {
            id: uuidv4(),
            name: heroName,
            description: heroDescr,
            element: heroElement
        }
        
        request("http://localhost:3001/heroes", 'POST', JSON.stringify(newHeroList))
        .then(dispatch(heroCreated(newHeroList)))
        .catch(e => console.log(e));

        setHeroDescr('');
        setHeroName('');
        setHeroElement('');
    }

    const renderFilters = (filters, status) => {
        if (status === 'loading') {
            return <option>Loading...</option>
        } else if (status === 'error') {
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