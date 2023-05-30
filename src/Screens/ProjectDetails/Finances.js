import React from 'react';
import { Text, View, Image, useColorScheme } from 'react-native';

import { FontSize } from '../../Theme/FontSize';
import Colors from '../../Theme/Colors';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import { useSelector } from 'react-redux';
import { Icons } from '../../Assets/Images/Index';

const Finances = ({ navigation }) => {

  const { id, details } = useSelector(({ Projects }) => Projects)

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
                  }}>{(!!details.orderdetails[0].property)? `${details?.orderdetails[0]?.property?._id}`: '-'}</Text>
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
                }}>{(!!details.orderdetails[0].property) ? `${details?.orderdetails[0]?.property?.addressOne}`: '-'}</Text>
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
        </View>
      </View> */}

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
    </View>
  );

}

export default Finances;
