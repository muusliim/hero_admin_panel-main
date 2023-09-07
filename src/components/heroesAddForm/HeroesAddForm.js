import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { newHeroAdd } from "../../actions";

import { useHttp } from "../../hooks/http.hook";

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const [heroName, setHeroName] = useState('');
    const [heroDescr, setHeroDescr] = useState('');
    const [heroElement, setHeroElement] = useState('');

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
        .then(dispatch(newHeroAdd(newHeroList)))
        .catch(e => console.log(e));

        setHeroDescr('');
        setHeroName('');
        setHeroElement('');
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
                    <option >Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;