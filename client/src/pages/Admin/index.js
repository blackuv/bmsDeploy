import React, { Children } from 'react'
import { Table, Tabs } from 'antd'
import MovieList from './MovieList'
import TheatresTable from './TheatreTable'

function Admin() {
    const tabItems = [
        { key:"1", label: "Movies", children: <MovieList/>},
        { key:"2", label: "Theatres", children: <TheatresTable/>},
    ]
  return (
    <div>
        <h1>Admin</h1>
        <Tabs items={tabItems}/>
    </div>
  )
}

export default Admin