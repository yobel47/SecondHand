import {
  StyleSheet, Text, View, Image,
} from 'react-native';
import React, { useMemo, useCallback } from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import CustomButton from '../CustomButton';
import InputText from '../InputText';
import HelperText from '../HelperText';
import { COLORS, FONTS, SIZES } from '../../constant';
import { bidPriceSchema } from '../../utils';

function BottomSheetComponent({
  productName, price, sheetRef, handleSnapPress, title, placeholder,
}) {
  const { t, i18n } = useTranslation();

  // variables
  const snapPoints = useMemo(() => ['1%', '1%', '64%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleClosePress = () => sheetRef.current.close();

  // renders
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        disappearsOnIndex={1}
        appearsOnIndex={2}
      />
    ),
    [],
  );

  return (
    <BottomSheet
      index={0}
      ref={sheetRef}
      snapPoints={snapPoints}
      enableHandlePanningGesture
      enableContentPanningGesture
      enableOverDrag
      animateOnMount
      backdropComponent={renderBackdrop}
      onChange={handleSheetChanges}
    >
      <Formik
        validationSchema={bidPriceSchema}
        initialValues={{ bid_price: '' }}
        onSubmit={(values) => console.log(values.bid_price)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          touched,
          values,
          errors,
          isValid,
        }) => (
          <View
            style={{
              flex: 1,
              backgroundColor: COLORS.white,
              padding: SIZES.h2,
            }}
          >
            <Text style={{ color: COLORS.black, ...FONTS.bodyNormalMedium }}>
              Masukan Harga Tawarmu
            </Text>
            <Text style={{ color: COLORS.neutral3, ...FONTS.bodyNormalMedium }}>
              Harga tawaranmu akan diketahui penjual, jika penjual cocok kamu
              akan segera dihubungi penjual.
            </Text>
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
                <Image
                  source={{
                    uri: 'https://merekbagus.com/wp-content/uploads/2020/10/Merk-tas-lokal-Doris-Dorothea.jpg',
                  }}
                  style={{ width: 48, height: 48 }}
                />
              </View>
              <View style={{ paddingLeft: SIZES.padding3 }}>
                <Text
                  style={{ ...FONTS.bodyLargeMedium, color: COLORS.neutral5 }}
                >
                  {productName}
                </Text>
                <Text
                  style={{
                    ...FONTS.bodyNormalRegular,
                    color: COLORS.neutral3,
                  }}
                >
                  {price}
                </Text>
              </View>
            </View>
            <View style={{ marginVertical: SIZES.h2 }}>
              <Text style={{ ...FONTS.bodyNormalBold }}>{title}</Text>
              <InputText
                placeholder={placeholder}
                name="bid_price"
                style={{ marginTop: 4 }}
                onChangeText={handleChange('bid_price')}
                onBlur={handleBlur('bid_price')}
                error={touched.bid_price && errors.bid_price}
                value={values.bid_price}
                type="number-pad"
              />
              {touched.bid_price && errors.bid_price && (
                <HelperText text={t(errors.bid_price)} />
              )}
            </View>
            <CustomButton
              onPress={handleSubmit}
              buttonStyle={{ width: '100%' }}
              title="Kirim"
              enabled={isValid && !errors.bid_price}
            />
          </View>
        )}
      </Formik>
    </BottomSheet>
  );
}

export default BottomSheetComponent;

const styles = StyleSheet.create({});