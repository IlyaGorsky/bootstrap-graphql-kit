// Для запуска yarn demo-2
import {
    fetchFirstQuery,
    CharacterCardFragment,
} from './_generated_/first.query.generated'
import { fetchFirst2Query } from './_generated_/first2.query.generated'
import { fetchFirst3Query } from './_generated_/first3.query.generated'
import { notEmpty } from './notEmpty'

// Empty variables
const query1 = await fetchFirstQuery()

function print(characters?: CharacterCardFragment[]) {
    if (characters) {
        characters.forEach(({ name }) => {
            console.log('character name', name)
        })
    }
}

const characters = query1.data?.characters?.results?.filter(notEmpty)

print(characters)

// Optional variables
const query2 = await fetchFirst2Query();
console.log('Optional variables', query2.data?.episodes);

// Required variables
const query3 = await fetchFirst3Query({ filterName: 'Morty'});
console.log('Required variables', query3.data?.characters);