/*
 * Copyright (c) 2025 Amazon.com, Inc. or its affiliates.  All rights reserved.
 *
 * PROPRIETARY/CONFIDENTIAL.  USE IS SUBJECT TO LICENSE TERMS.
 */
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['babel-plugin-react-compiler', {
      target: '18'
    }],
  ],
};
