import React from 'react'
import { Typography } from "antd"

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => (
          <Typography.Text style={{ fontSize: 18 }}>
            {text}
          </Typography.Text>
        )
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        render: text => (
          <Typography.Text style={{ fontSize: 18 }}>
            {text}
          </Typography.Text>
        )
    },
    {
        title: 'Party',
        dataIndex: 'party',
        key: 'party',
        render: text => (
          <Typography.Text style={{ fontSize: 18 }}>
            {text}
          </Typography.Text>
        )
    },
    {
        title: 'Population',
        dataIndex: 'population',
        key: 'population',
        render: text => (
          <Typography.Text style={{ fontSize: 18 }}>
            {text}
          </Typography.Text>
        )
    },
    {
        title: 'Elected Official',
        dataIndex: 'official_name',
        key: 'official_name',
        render: text => (
          <Typography.Text style={{ fontSize: 18 }}>
            {text}
          </Typography.Text>
        )
    }
]
// Elected official column, link to search query in politicians

export default columns;