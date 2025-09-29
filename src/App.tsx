/*
 * Copyright (c) 2022 Amazon.com, Inc. or its affiliates.  All rights reserved.
 *
 * PROPRIETARY/CONFIDENTIAL.  USE IS SUBJECT TO LICENSE TERMS.
 */

'use strict';

import React, {StrictMode} from 'react';
import {StyleSheet, View} from 'react-native';

import {Grid} from './config';
import {PAGE_PADDING, SCREEN_DIMENSION} from './constants';

export const App = () => {
  return (
    <StrictMode>
      <View style={styles.pageContainer}>
        <Grid />
      </View>
    </StrictMode>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    height: SCREEN_DIMENSION.height,
    width: SCREEN_DIMENSION.width,
    backgroundColor: '#252a30',
    paddingLeft: PAGE_PADDING,
  },
});
