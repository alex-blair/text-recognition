import React, {Component} from 'react'
import { Text } from 'react-native';

interface HeaderProps {
  text: string;
}

export default class Header extends Component<HeaderProps>{
  render() {
    return (
      <Text style={{fontSize: 24, color: 'blue'}}>
        {this.props.text}
      </Text>
    )
  }
}