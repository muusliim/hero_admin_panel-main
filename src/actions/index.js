export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroDeleting = (id) => {
    return {
        type: 'HERO_DELETING',
        payload: id
    }
}

export const newHeroAdd = (hero) => {
    return {
        type: 'HERO_ADD',
        payload: hero
    }
}
