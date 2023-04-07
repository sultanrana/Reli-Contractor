import React from 'react';
import SimpleToast from 'react-native-simple-toast';

import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    FlatList,
} from 'react-native';
import colors from '../Theme/Colors';
import Fonts from '../Assets/Fonts/Index';
import { FontSize } from '../Theme/FontSize';
import { Icons, Images } from '../Assets/Images/Index';
import Colors from '../Theme/Colors';
import { GetStyles } from '../Theme/AppStyles';
import ContainedButton from './ContainedButton';

const Types = {
    WindowProject: "WINDOW_PROJECT",
    Property: "PROPERTY",
    Materials: "MATERIALS",
    Labor: "LABOR",
}


const FinanceBox =
    ({
        navigation,
        item

    }) => {

        const scheme = useColorScheme()
        const AppColors = Colors(scheme)
        const AppStyles = GetStyles(scheme)

        const styles = StyleSheet.create({
            mainContainer: {
                width: '99.5%',
                flexDirection: 'row',
                // backgroundColor: (scheme === 'light') ? AppColors.White : AppColors.BlackGreyish,
                backgroundColor: AppColors.White,
                borderRadius: 16,
                zIndex: 0,
                shadowColor: AppColors.BlackGreyish,
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.16,
                // shadowRadius: 6,
                height: 104,
                alignSelf: 'center'
            },
            image: {
                width: 90,
                height: 88,
                zIndex: 0,
                borderRadius: 16
            }

        });


        const renderWindowComponent = (windowProject, ordered, scheduled, completed) => {
            return (
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    padding: 4,
                    height: 104,
                }}>
                    <View style={{ width: '25%', justifyContent: 'center', alignItems: 'center', borderRadius: 16, backgroundColor: AppColors.Background, elevation: 1 }}>
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
                                }}>{'Window Project: '}
                                <Text
                                    numberOfLines={1}
                                    allowFontScaling={false} style={{
                                        fontSize: FontSize.large,
                                        fontFamily: Fonts.Regular,
                                        color: AppColors.TextTitle,
                                    }}>{windowProject}</Text>
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
                                }}>{ordered}</Text>
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
                                }}>{scheduled}</Text>
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
                                }}>{completed}</Text>

                        </Text>



                    </View>
                </View>
            )
        }

        const renderPropertyComponent = (propertyID, address1, address2, address3, address4) => {
            return (
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    padding: 4,
                    height: 104
                }}>
                    <View style={{ width: '25%', justifyContent: 'center', alignItems: 'center', borderRadius: 16, backgroundColor: AppColors.Background, elevation: 1 }}>
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
                                    }}>{propertyID}</Text>
                            </Text>

                        </View>


                        <Text
                            numberOfLines={1}
                            allowFontScaling={false} style={{
                                fontSize: FontSize.medium,
                                fontFamily: Fonts.Regular,
                                color: AppColors.TextTitle,
                            }}>{address1}</Text>



                        <Text
                            numberOfLines={1}
                            allowFontScaling={false} style={{
                                fontSize: FontSize.medium,
                                fontFamily: Fonts.Regular,
                                color: AppColors.TextTitle,
                            }}>{address2}</Text>


                        <View style={{
                            flexDirection: 'row',
                            width: '100%',
                            justifyContent: 'space-between'
                        }}>
                            <Text
                                numberOfLines={1}
                                allowFontScaling={false} style={{
                                    fontSize: FontSize.medium,
                                    fontFamily: Fonts.Regular,
                                    color: AppColors.TextTitle,
                                    alignSelf: 'flex-start',
                                    width: '65%',
                                    textAlign: 'left',
                                }}>{address3}</Text>
                            <Text
                                numberOfLines={1}
                                allowFontScaling={false} style={{
                                    fontSize: FontSize.medium,
                                    fontFamily: Fonts.Regular,
                                    color: AppColors.TextTitle,
                                    textAlign: 'right',
                                    width: '35%'

                                }}>{address4}</Text>
                        </View>
                    </View>
                </View>
            )
        }

        const rendeMaterialsComponent = (total, windows) => {
            return (
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    padding: 4,
                    height: 104
                }}>
                    <View style={{ width: '25%', justifyContent: 'center', alignItems: 'center', borderRadius: 16, backgroundColor: AppColors.Background, elevation: 1 }}>
                        <Image source={Icons.Projects} style={{
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
                                }}>{total}</Text>
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
                                }}>{windows}</Text>
                        </Text>


                    </View>
                </View>
            )
        }

        const rendeLaborComponent = (total) => {
            return (
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    padding: 4,
                    height: 104
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
                            }}>{total}</Text>
                        </Text>

                    </View>
                </View>
            )
        }


        return (

            <View style={[styles.mainContainer]}>

                {
                    (() => {
                        if (item?.type === Types.WindowProject) {
                            const { project_id, ordered, scheduled, completed } = item?.payload
                            return renderWindowComponent(project_id, ordered, scheduled, completed)
                        }

                        else if (item?.type === Types.Property) {
                            const { property_id, address1, address2, address3, address4 } = item?.payload
                            return renderPropertyComponent(property_id, address1, address2, address3, address4)
                        }

                        else if (item?.type === Types.Materials) {
                            const { total, windows } = item?.payload
                            return rendeMaterialsComponent(total, windows)
                        }

                        else if (item?.type === Types.Labor) {
                            const { total } = item?.payload
                            return rendeLaborComponent(total)
                        }

                        else {
                            return (
                                <></>
                            )
                        }
                    })()
                }

            </View>
        )
    };

export default FinanceBox;

