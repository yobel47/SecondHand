import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Button,
  FlatList,
} from 'react-native';
import React, {
  useEffect, useState, useRef, useMemo, useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  COLORS, SIZES, FONTS, style,
} from '../../constant';
import {
  GoBackIcon,
  PhotoProfile,
  CustomButton,
  InputText,
  BottomSheetComponent,
} from '../../components';
import { getDetailData } from '../../redux/actions';
import styles from '../../constant/styles';
import formatRupiah from '../../utils/formatCurrency';

function Detail({ route, navigation }) {
  const dispatch = useDispatch();

  const { productId } = route.params;
  const profileData = useSelector((state) => state.profile.profileData);
  const login = useSelector((state) => state.login.isLogin);
  const detailData = useSelector((state) => state.detail.detailProduct);

  const { t, i18n } = useTranslation();

  // ref
  const sheetRef = useRef(null);

  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  useEffect(() => {
    console.log('Product Id', productId);
    dispatch(getDetailData(productId));
    console.log('Detail Product', detailData.User);
  }, [productId, dispatch]);

  const checkLogin = () => {
    if (login) {
      handleSnapPress(2);
    } else {
      navigation.navigate('NotLogin');
    }
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: COLORS.neutral1 }}
      >
        <View style={{ flex: 1, marginBottom: SIZES.padding5 }}>
          <Image source={{ uri: detailData.image_url }} style={{ height: 300 }} />
          <GoBackIcon iconColor={COLORS.neutral5} size={28} style={{ top: 28 }} />
          <View style={{ marginHorizontal: SIZES.padding5 }}>
            <View
              style={[
                styles.card,
                {
                  marginTop: -40,
                  paddingHorizontal: SIZES.padding5,
                  paddingVertical: SIZES.padding3,
                },
              ]}
            >
              <Text style={{ ...FONTS.bodyLargeMedium, color: COLORS.neutral5 }}>
                {detailData.name}
              </Text>
              <FlatList
                data={detailData.Categories}
                horizontal
                keyExtractor={(item, index) => item.id + index.toString()}
                renderItem={({ item, index }) => (
                  <Text
                    key={item.id}
                    style={{
                      ...FONTS.bodyNormalRegular,
                      color: COLORS.neutral3,
                    }}
                  >
                    {index > 0 ? ',' : ''}
                    {' '}
                    {item.name}
                  </Text>
                )}
              />
              <Text
                style={{
                  ...FONTS.bodyLargeRegular,
                  fontSize: 18,
                  color: COLORS.neutral5,
                }}
              >
                {formatRupiah(detailData.base_price)}
              </Text>
            </View>
            <View
              style={[
                styles.card,
                {
                  marginTop: SIZES.padding3,
                  paddingHorizontal: SIZES.padding5,
                  paddingVertical: SIZES.padding3,
                  flexDirection: 'row',
                },
              ]}
            >
              <View style={{ justifyContent: 'center' }}>
                <PhotoProfile
                  image={{ uri: detailData.User.image_url }}
                  style={{ width: 48, height: 48 }}
                  styleImage={{ width: 48, height: 48 }}
                />
              </View>
              <View style={{ paddingLeft: SIZES.padding3 }}>
                <Text
                  style={{ ...FONTS.bodyLargeMedium, color: COLORS.neutral5 }}
                >
                  {detailData.User.full_name}
                </Text>
                <Text
                  style={{ ...FONTS.bodyNormalRegular, color: COLORS.neutral3 }}
                >
                  {detailData.User.city}
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.card,
                {
                  marginTop: SIZES.padding3,
                  paddingHorizontal: SIZES.padding5,
                  paddingVertical: SIZES.padding3,
                },
              ]}
            >
              <Text style={{ ...FONTS.bodyLargeMedium, color: COLORS.neutral5 }}>
                {t('descriptionTitle')}
              </Text>
              <Text
                style={{
                  ...FONTS.bodyLargeRegular,
                  paddingTop: SIZES.padding3,
                  color: COLORS.neutral3,
                }}
              >
                {detailData.description}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 23,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 24,
        }}
      >
        <CustomButton
          buttonStyle={{ width: '100%' }}
          title="Saya Tertarik dan Ingin Nego Produk"
          enabled
          onPress={() => checkLogin()}
        />
      </View>
      <BottomSheetComponent
        sheetRef={sheetRef}
        handleSnapPress={handleSnapPress}
        productName={detailData.name}
        price={detailData.base_price}
        imageUrl={detailData.image_url}
        title="Harga Tawar"
        placeholder={t('pricePlaceholder')}
      />
    </>
  );
}

export default Detail;
