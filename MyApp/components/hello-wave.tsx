import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';

export function HelloWave() {
  const rotate = useSharedValue(0);

  // tạo animation
  rotate.value = withRepeat(
    withTiming(25, { duration: 300 }),
    4,
    true // quay lại chiều cũ
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));

  return (
    <Animated.Text
      style={[
        {
          fontSize: 28,
          lineHeight: 32,
          marginTop: -6,
        },
        animatedStyle,
      ]}>
      👋
    </Animated.Text>
  );
}
