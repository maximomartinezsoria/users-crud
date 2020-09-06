import React from 'react'
import Avatar from 'react-avatar'

const tableColumns = [
  {title: 'id', field: 'id', hidden: true},
  {title: "Avatar", render: rowData => <Avatar maxInitials={1} size={40} round={true} name={rowData ? rowData.name : ' '} />  },
  {title: "Name", field: "name"},
  {title: "Age", field: "age"},
]

export default tableColumns