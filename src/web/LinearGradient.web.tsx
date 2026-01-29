import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface LinearGradientProps {
  colors: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  style?: ViewStyle;
  children?: React.ReactNode;
}

const LinearGradient: React.FC<LinearGradientProps> = ({
  colors,
  start = { x: 0, y: 0 },
  end = { x: 0, y: 1 },
  style,
  children,
}) => {
  const angle = Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI) + 90;
  const gradientColors = colors.join(', ');

  return (
    <View
      style={[
        styles.gradient,
        {
          background: `linear-gradient(${angle}deg, ${gradientColors})`,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});

export default LinearGradient;

