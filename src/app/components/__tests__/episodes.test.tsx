import React from 'react'
import { describe, expect, test } from 'vitest'
import { render, fireEvent, act } from '@testing-library/react'
import Episodes from '../episodes'
import mockGraphQL from '../../../api/tests/mockGraphQL'
import { First2Query, mockFirst2Query } from 'src/app/_generated_/first2.query.generated'

describe('<Episodes/>', () => {
    test('correct render with click button show episodes', async () => {
        const result = render(<Episodes />)
        const mock = mockGraphQL(mockFirst2Query.operationName)
        const mockData = {
            __typename: 'Query',
            episodes: {
                __typename: 'Episodes',
                results: [
                    {
                        __typename: 'Episode',
                        name: 'Test-1',
                    },
                ],
            },
        } satisfies First2Query
        const expectedHTML = `<ul><li>Test-1</li></ul>`
        mock.reply(mockFirst2Query(() => mockData))

        await act(() => {
            fireEvent(
                result.getByRole('button'),
                new MouseEvent('click', {
                    bubbles: true,
                })
            )
        })

        expect(result.container.innerHTML).toStrictEqual(expectedHTML)
    })
})
