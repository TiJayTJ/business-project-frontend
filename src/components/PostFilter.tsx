import React, { FC } from 'react'
import { MyInput } from './UI/input/MyInput';
import { MySelect } from './UI/select/MySelect';

interface PostFilterProps {
    filter: {
        sort: string;
        query: string;
    }
    setFilter: (e: {sort: string; query: string;} ) => void
}

export const PostFilter: FC<PostFilterProps> = ({filter, setFilter}) => {
    return (
        <div>
            <MyInput
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value})}
                type="txt"
                placeholder='Поиск...'
            />
            <MySelect
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                defaultValue='Сортировка'
                options={[
                    {value: 'surname', name: 'По фамилии'},
                    {value: 'name', name: 'По имени'},
                    {value: 'patronymic', name: 'По отчеству'},
                ]}
            />
        </div>
    );
}