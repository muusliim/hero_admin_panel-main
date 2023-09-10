import {useHttp} from '../../hooks/http.hook';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import { fetchHeroes, heroDeleting } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';


const HeroesList = () => {

    const filteredHeroesSelector = createSelector(
        state => state.filters.activeFilter,
        state => state.heroes.heroes, 
        (filter, heroes) => {
            if(filter === 'all') {
                return heroes;
            } else {
                return heroes.filter(item => item.element === filter)
            }
        }
    )

    const filteredHeroes = useSelector(filteredHeroesSelector);
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes(request)('heroes'))
        // eslint-disable-next-line
    }, []);

    const onHeroDelete = useCallback((id) => {
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
        .then(dispatch(heroDeleting(id)))
        .catch(e => console.log(e));
        // eslint-disable-next-line
    },[request])


    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem 
            onHeroDelete={() => onHeroDelete(id)} 
            key={id} 
            {...props}/>
        })
    }
    const elements = renderHeroesList(filteredHeroes);
    return ( 
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;