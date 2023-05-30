import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, SectionList, FlatList } from 'react-native';

import { FontSize } from '../../Theme/FontSize';
import Colors from '../../Theme/Colors';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import { useSelector } from 'react-redux';
import { Icons } from '../../Assets/Images/Index';


const Types = {
  WindowProject: "WINDOW_PROJECT",
  Property: "PROPERTY",
  Materials: "MATERIALS",
  Labor: "LABOR",
}


const FINANCES_DATA = [
  {
    type: Types.WindowProject,
    payload: {
      project_id: 'A6544477',
      ordered: '01/07/2022',
      scheduled: '12/07/2022',
      completed: '01/08/2022'
    }
  },
  {
    type: Types.Property,
    payload: {
      property_id: 'A652177435',
      address1: '2972 Westheimer Rd.',
      address2: 'Santa Ana, Illinois',
      address3: '85489',
      address4: 'Floor: 2nd'
    }
  },
  {
    type: Types.Materials,
    payload: {
      total: '$800.00',
      windows: '04 windows',
    }
  },
  {
    type: Types.Labor,
    payload: {
      total: '$600.00'
    }
  },
]

const Finances = ({ navigation }) => {

  const { id, details } = useSelector(({ Projects }) => Projects)

  console.log(details);

  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)

  return (
    <View style={[AppStyles.ProjectDetailsScreen]}>

      <View style={{
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 16,
        height: 104,
      }}>
        <View style={{ width: '25%', justifyContent: 'center', alignItems: 'center', borderRadius: 16, backgroundColor: AppColors.White, elevation: 1 }}>
          <Image source={Icons.Cart} style={{
            width: 48,
            height: 48,
            tintColor: AppColors.Primary
          }} />
        </View>
        <View style={{ width: '75%', justifyContent: 'center', paddingHorizontal: 8 }}>
          <View style={{
            marginVertical: 4,
          }}>
            <Text
              numberOfLines={1}
              allowFontScaling={false} style={{
                fontSize: FontSize.large,
                fontFamily: Fonts.SemiBold,
                color: AppColors.TextTitle,
              }}>{details?.orderdetails[0]?.serviceName}
              {/* <Text
                numberOfLines={1}
                allowFontScaling={false} style={{
                  fontSize: FontSize.large,
                  fontFamily: Fonts.Regular,
                  color: AppColors.TextTitle,
                }}>{'windowProject'}</Text> */}
            </Text>

          </View>

          <Text
            numberOfLines={1}
            allowFontScaling={false} style={{
              fontSize: FontSize.medium,
              fontFamily: Fonts.SemiBold,
              color: AppColors.TextTitle,
            }}>{'Ordered: '}
            <Text
              numberOfLines={1}
              allowFontScaling={false} style={{
                fontSize: FontSize.medium,
                fontFamily: Fonts.Regular,
                color: AppColors.TextTitle,
              }}>{details?.dateSelection[0]}</Text>
          </Text>

          <Text
            numberOfLines={1}
            allowFontScaling={false} style={{
              fontSize: FontSize.medium,
              fontFamily: Fonts.SemiBold,
              color: AppColors.TextTitle,
            }}>{'Scheduled: '}
            <Text
              numberOfLines={1}
              allowFontScaling={false} style={{
                fontSize: FontSize.medium,
                fontFamily: Fonts.Regular,
                color: AppColors.TextTitle,
              }}>{details?.dateSelection[0]}</Text>
          </Text>

          <Text
            numberOfLines={1}
            allowFontScaling={false} style={{
              fontSize: FontSize.medium,
              fontFamily: Fonts.SemiBold,
              color: AppColors.TextTitle,
            }}>{'Completed: '}
            <Text
              numberOfLines={1}
              allowFontScaling={false} style={{
                fontSize: FontSize.medium,
                fontFamily: Fonts.Regular,
                color: AppColors.TextTitle,
              }}>{details?.orderStatus != 'Completed' ? 'No' : 'Yes'}</Text>

          </Text>



        </View>
      </View>

      <View style={{
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 16,
        height: 104,
        marginTop: 10,
      }}>
        <View style={{ width: '25%', justifyContent: 'center', alignItems: 'center', borderRadius: 16, backgroundColor: AppColors.White, elevation: 1 }}>
          <Image source={Icons.Home} style={{
            width: 48,
            height: 48,
            tintColor: AppColors.Primary
          }} />
        </View>
        <View style={{ width: '75%', justifyContent: 'center', paddingHorizontal: 8 }}>
          <View style={{
            marginVertical: 4
          }}>
            <Text
              numberOfLines={1}
              allowFontScaling={false} style={{
                fontSize: FontSize.large,
                fontFamily: Fonts.SemiBold,
                color: AppColors.TextTitle,
              }}>{'Property ID: '}
              <Text
                numberOfLines={1}
                allowFontScaling={false} style={{
                  fontSize: FontSize.large,
                  fontFamily: Fonts.Regular,
                  color: AppColors.TextTitle,
                }}>{details?.orderdetails[0]?.property?._id}</Text>
            </Text>

          </View>

          <Text
            numberOfLines={1}
            allowFontScaling={false} style={{
              fontSize: FontSize.large,
              fontFamily: Fonts.SemiBold,
              color: AppColors.TextTitle,
            }}>{'Address: '}
            <Text
              numberOfLines={1}
              allowFontScaling={false} style={{
                fontSize: FontSize.medium,
                fontFamily: Fonts.Regular,
                color: AppColors.TextTitle,
              }}>{details?.orderdetails[0].property?.addressOne}</Text>
          </Text>

        </View>
      </View>

      {/* <View style={{
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 16,
        height: 104,
        marginTop: 10,
      }}> */}
        {/* <View style={{ width: '25%', justifyContent: 'center', alignItems: 'center', borderRadius: 16, backgroundColor: AppColors.Background, elevation: 1 }}>
          <Image source={Icons.Projects} style={{
            width: 48,
            height: 48,
            tintColor: AppColors.Primary
          }} />
        </View> */}
        {/* <View style={{ width: '75%', justifyContent: 'center', paddingHorizontal: 8 }}>
          <View style={{
            marginVertical: 4
          }}>
            <Text
              numberOfLines={1}
              allowFontScaling={false} style={{
                fontSize: FontSize.large,
                fontFamily: Fonts.SemiBold,
                color: AppColors.TextTitle,
              }}>{'Materials'}</Text>
          </View>

          <Text
            numberOfLines={1}
            allowFontScaling={false} style={{
              fontSize: FontSize.medium,
              fontFamily: Fonts.SemiBold,
              color: AppColors.TextTitle,
            }}>{'Total: '}
            <Text
              numberOfLines={1}
              allowFontScaling={false} style={{
                fontSize: FontSize.medium,
                fontFamily: Fonts.Regular,
                color: AppColors.TextTitle,
              }}>{`$${details?.orderdetails[0]?.totalAmount}.00`}</Text>
          </Text>
          <Text
            numberOfLines={1}
            allowFontScaling={false} style={{
              fontSize: FontSize.medium,
              fontFamily: Fonts.SemiBold,
              color: AppColors.TextTitle,
            }}>{'Windows: '}
            <Text
              numberOfLines={1}
              allowFontScaling={false} style={{
                fontSize: FontSize.medium,
                fontFamily: Fonts.Regular,
                color: AppColors.TextTitle,
              }}>{'-'}</Text>
          </Text>
          <Text
            numberOfLines={1}
            allowFontScaling={false} style={{
              fontSize: FontSize.medium,
              fontFamily: Fonts.SemiBold,
              color: AppColors.TextTitle,
            }}>{'Paid On: '}
            <Text
              numberOfLines={1}
              allowFontScaling={false} style={{
                fontSize: FontSize.medium,
                fontFamily: Fonts.Regular,
                color: AppColors.TextTitle,
              }}>{details?.dateSelection[0]}</Text>
          </Text>
        </View> */}
      {/* </View> */}

      <View style={{
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 16,
        height: 104,
        marginTop: 10,
      }}>
        <View style={{ width: '25%', justifyContent: 'center', alignItems: 'center', borderRadius: 16, backgroundColor: AppColors.Background, elevation: 1 }}>
          <Image source={Icons.Briefcase} style={{
            width: 48,
            height: 48,
            tintColor: AppColors.Primary
          }} />
        </View>
        <View style={{ width: '75%', justifyContent: 'center', paddingHorizontal: 8 }}>
          <View style={{
            marginVertical: 4
          }}>
            <Text allowFontScaling={false} style={{
              fontSize: FontSize.large,
              fontFamily: Fonts.SemiBold,
              color: AppColors.TextTitle,
            }}>{'Labor'}</Text>
          </View>


          <Text allowFontScaling={false} style={{
            fontSize: FontSize.medium,
            fontFamily: Fonts.SemiBold,
            color: AppColors.TextTitle,
          }}>{'Total: '}
            <Text allowFontScaling={false} style={{
              fontSize: FontSize.medium,
              fontFamily: Fonts.Regular,
              color: AppColors.TextTitle,
            }}>{'-'}</Text>
          </Text>

        </View>
      </View>

      {/* <FlatList
        showsVerticalScrollIndicator={false}
        data={FINANCES_DATA}
        renderItem={({ item }) => (
          <FinanceBox navigation={navigation} item={item} />
        )}
        keyExtractor={(item, index) => 'ser' + index}

        contentContainerStyle={{ paddingBottom: 80, }}
        style={{
          flexGrow: 0,
        }}
        ItemSeparatorComponent={() => (
          <View style={{ margin: 4 }} />
        )}
      />
      <View style={{
        paddingHorizontal: 8,
        position: 'absolute',
        right: 8,
        bottom: 10,
        width: '30%'
      }}>
        <ContainedButton
          label="Claim"
          style={{  }}

        />
      </View> */}
    </View>
  );

}

export default Finances;
