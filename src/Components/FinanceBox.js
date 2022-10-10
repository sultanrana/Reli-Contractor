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
                backgroundColor: (scheme === 'light') ? AppColors.White : AppColors.BlackGreyish,
                borderRadius: 16,
                zIndex: 0,
                elevation: 1,
                height: 104,
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
                    height: 104
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
                            flexDirection: 'row',
                            marginVertical: 4
                        }}>
                            <Text style={{
                                fontSize: FontSize.large,
                                fontFamily: Fonts.SemiBold,
                                color: AppColors.TextTitle,
                            }}>{'Window Project: '}</Text>
                            <Text style={{
                                fontSize: FontSize.large,
                                fontFamily: Fonts.Regular,
                                color: AppColors.TextTitle,
                            }}>{windowProject}</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <Text style={{
                                fontSize: FontSize.medium,
                                fontFamily: Fonts.SemiBold,
                                color: AppColors.TextTitle,
                            }}>{'Ordered: '}</Text>
                            <Text style={{
                                fontSize: FontSize.medium,
                                fontFamily: Fonts.Regular,
                                color: AppColors.TextTitle,
                            }}>{ordered}</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <Text style={{
                                fontSize: FontSize.medium,
                                fontFamily: Fonts.SemiBold,
                                color: AppColors.TextTitle,
                            }}>{'Scheduled: '}</Text>
                            <Text style={{
                                fontSize: FontSize.medium,
                                fontFamily: Fonts.Regular,
                                color: AppColors.TextTitle,
                            }}>{scheduled}</Text>
                        </View>


                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <Text style={{
                                fontSize: FontSize.medium,
                                fontFamily: Fonts.SemiBold,
                                color: AppColors.TextTitle,
                            }}>{'Completed: '}</Text>
                            <Text style={{
                                fontSize: FontSize.medium,
                                fontFamily: Fonts.Regular,
                                color: AppColors.TextTitle,
                            }}>{completed}</Text>
                        </View>


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
                            flexDirection: 'row',
                            marginVertical: 4
                        }}>
                            <Text style={{
                                fontSize: FontSize.large,
                                fontFamily: Fonts.SemiBold,
                                color: AppColors.TextTitle,
                            }}>{'Property ID: '}</Text>
                            <Text style={{
                                fontSize: FontSize.large,
                                fontFamily: Fonts.Regular,
                                color: AppColors.TextTitle,
                            }}>{propertyID}</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <Text style={{
                                fontSize: FontSize.medium,
                                fontFamily: Fonts.Regular,
                                color: AppColors.TextTitle,
                            }}>{address1}</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <Text style={{
                                fontSize: FontSize.medium,
                                fontFamily: Fonts.Regular,
                                color: AppColors.TextTitle,
                            }}>{address2}</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            width: '100%',
                            justifyContent: 'space-between'
                        }}>
                            <Text style={{
                                fontSize: FontSize.medium,
                                fontFamily: Fonts.Regular,
                                color: AppColors.TextTitle,
                                alignSelf: 'flex-start',
                                width: '65%',
                                textAlign: 'left',
                            }}>{address3}</Text>
                            <Text style={{
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
                            flexDirection: 'row',
                            marginVertical: 4
                        }}>
                            <Text style={{
                                fontSize: FontSize.large,
                                fontFamily: Fonts.SemiBold,
                                color: AppColors.TextTitle,
                            }}>{'Materials'}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <Text style={{
                                fontSize: FontSize.medium,
                                fontFamily: Fonts.SemiBold,
                                color: AppColors.TextTitle,
                            }}>{'Total: '}</Text>
                            <Text style={{
                                fontSize: FontSize.medium,
                                fontFamily: Fonts.Regular,
                                color: AppColors.TextTitle,
                            }}>{total}</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <Text style={{
                                fontSize: FontSize.medium,
                                fontFamily: Fonts.SemiBold,
                                color: AppColors.TextTitle,
                            }}>{'Windows: '}</Text>
                            <Text style={{
                                fontSize: FontSize.medium,
                                fontFamily: Fonts.Regular,
                                color: AppColors.TextTitle,
                            }}>{windows}</Text>
                        </View>
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
                            flexDirection: 'row',
                            marginVertical: 4
                        }}>
                            <Text style={{
                                fontSize: FontSize.large,
                                fontFamily: Fonts.SemiBold,
                                color: AppColors.TextTitle,
                            }}>{'Labor'}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <Text style={{
                                fontSize: FontSize.medium,
                                fontFamily: Fonts.SemiBold,
                                color: AppColors.TextTitle,
                            }}>{'Total: '}</Text>
                            <Text style={{
                                fontSize: FontSize.medium,
                                fontFamily: Fonts.Regular,
                                color: AppColors.TextTitle,
                            }}>{total}</Text>
                        </View>
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

