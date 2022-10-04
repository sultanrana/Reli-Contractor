import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { ThemeConstants } from '../theme';
import PropTypes from 'prop-types';
import { house, slidingDoor } from '../theme/Images';
import { FontStyles } from '../theme/styles/Fonts';

const ProjectListItem = ({ item }) => {
  const { title, description, thumbnail, icon, date } = item;
  return (
    <View style={styles.item}>
      <View style={styles.images}>
        <Image source={thumbnail} style={styles.thumbnail} />
        <View style={styles.icon}>
          <Image source={icon} />
        </View>
      </View>
      <View style={{ marginLeft: 10 }}>
        <Text style={[FontStyles.textRegular, { fontWeight: '600' }]}>
          {title}
        </Text>
        <Text style={FontStyles.textSmall}>{description}</Text>
        <Text style={FontStyles.textSmall}>{date}</Text>
      </View>
    </View>
  );
};

export default ProjectListItem;

ProjectListItem.propTypes = { item: PropTypes.object };

ProjectListItem.defaultProps = {
  item: [
    {
      thumbnail: house,
      icon: slidingDoor,
      title: '2x Sliding Glass Doors',
      description: '2900 Bristol St, Costa Mesa, CA 92626',
      date: 'Aug 22, Aug 23, or Sep 1',
    },
  ],
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 5,
  },
  images: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: { borderRadius: 5 },
  icon: {
    marginLeft: -20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 7,
    borderColor: ThemeConstants.Colors.primary,
    borderWidth: 1,
    backgroundColor: ThemeConstants.Colors.white,
  },
});
