import React from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'

const Categorias = () => (
  <Menu vertical>
    <Dropdown item text='Categorias'>
      <Dropdown.Menu>
        {this.props.categorias.map(categoria => (
          <Dropdown.Item>${categoria.name}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  </Menu>
)

export default Categorias