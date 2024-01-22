import { Select, SelectItem } from '@nextui-org/react'
import React from 'react'

type Props = {}

function DaySelect({ }: Props) {

    const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']

    return (
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Select
                label="Select a day"
                className=""
                selectionMode="multiple"
            >
                {days.map((day, i) => (
                    <SelectItem key={i} value={day}>
                        {day}
                    </SelectItem>
                ))}
            </Select>
        </div>
    )
}

export default DaySelect