import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { ThemeConstants } from '../../theme';
import Active from './Active';
import Available from './Available';
import Completed from './Completed';

const FirstRoute = () => <Active />;

const SecondRoute = () => <Available />;

const ThirdRoute = () => <Completed />;

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});
const Projects = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Active' },
    { key: 'second', title: 'Available' },
    { key: 'third', title: 'Completed' },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      activeColor={ThemeConstants.Colors.primary}
      inactiveColor={ThemeConstants.Colors.grey}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
};

export default Projects;

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: ThemeConstants.Colors.white,
  },
  indicator: {
    backgroundColor: ThemeConstants.Colors.primary,
  },
});
