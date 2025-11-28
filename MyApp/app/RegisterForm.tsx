import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, Eye, EyeOff, User, UserPlus } from 'lucide-react';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    // Validation thủ công thay vì dùng required và minLength
    if (!username || username.length < 3) {
      Alert.alert('Lỗi', 'Tên người dùng phải có ít nhất 3 ký tự!');
      return;
    }

    if (!email) {
      Alert.alert('Lỗi', 'Vui lòng nhập email!');
      return;
    }

    if (!password || password.length < 6) {
      Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu không khớp!');
      return;
    }
    
    if (!agreeTerms) {
      Alert.alert('Lỗi', 'Vui lòng đồng ý với điều khoản!');
      return;
    }

    console.log('Register:', { username, email, password });
    Alert.alert('Thành công', 'Đăng ký thành công! Nhận ngay 1000 coins 🎁');
    
    // Chuyển đến trang đăng nhập sau khi đăng ký thành công
    // router.push('/SignInForm');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Đăng Ký</Text>
      
      {/* Username */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Tên người dùng</Text>
        <View style={styles.inputWrapper}>
          <User size={20} color="#6B7280" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="gamer123"
            placeholderTextColor="#6B7280"
          />
        </View>
      </View>

      {/* Email */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrapper}>
          <Mail size={20} color="#6B7280" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="your@email.com"
            placeholderTextColor="#6B7280"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      {/* Password */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mật khẩu</Text>
        <View style={styles.inputWrapper}>
          <Lock size={20} color="#6B7280" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            placeholderTextColor="#6B7280"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeButton}
          >
            {showPassword ? 
              <EyeOff size={20} color="#6B7280" /> : 
              <Eye size={20} color="#6B7280" />
            }
          </TouchableOpacity>
        </View>
      </View>

      {/* Confirm Password */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Xác nhận mật khẩu</Text>
        <View style={styles.inputWrapper}>
          <Lock size={20} color="#6B7280" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="••••••••"
            placeholderTextColor="#6B7280"
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            style={styles.eyeButton}
          >
            {showConfirmPassword ? 
              <EyeOff size={20} color="#6B7280" /> : 
              <Eye size={20} color="#6B7280" />
            }
          </TouchableOpacity>
        </View>
      </View>

      {/* Terms Agreement */}
      <View style={styles.termsContainer}>
        <TouchableOpacity 
          style={styles.checkbox}
          onPress={() => setAgreeTerms(!agreeTerms)}
        >
          <View style={[styles.checkboxInner, agreeTerms && styles.checkboxChecked]}>
            {agreeTerms && <View style={styles.checkmark} />}
          </View>
        </TouchableOpacity>
        <Text style={styles.termsText}>
          Tôi đồng ý với{' '}
          <Text style={styles.link} onPress={() => Alert.alert('Điều khoản dịch vụ')}>
            Điều khoản dịch vụ
          </Text>
          {' '}và{' '}
          <Text style={styles.link} onPress={() => Alert.alert('Chính sách bảo mật')}>
            Chính sách bảo mật
          </Text>
        </Text>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Tạo tài khoản</Text>
        <UserPlus size={20} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Bonus Info */}
      <View style={styles.bonusContainer}>
        <Text style={styles.bonusText}>
          🎁 Thành viên mới nhận ngay 1000 coins + 10 game premium
        </Text>
      </View>

      {/* Login Link */}
      <TouchableOpacity 
        style={styles.loginLink}
        onPress={() => router.push('/SignInForm')}
      >
        <Text style={styles.loginLinkText}>
          Đã có tài khoản? Đăng nhập ngay
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  contentContainer: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#FFFFFF',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#D1D5DB',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    color: '#FFFFFF',
    fontSize: 16,
  },
  icon: {
    marginRight: 12,
  },
  eyeButton: {
    padding: 4,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    marginTop: 8,
  },
  checkbox: {
    marginRight: 12,
    marginTop: 2,
  },
  checkboxInner: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#4B5563',
    borderRadius: 4,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#9333EA',
    borderColor: '#9333EA',
  },
  checkmark: {
    width: 10,
    height: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
  },
  link: {
    color: '#C084FC',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9333EA',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  bonusContainer: {
    backgroundColor: 'rgba(147, 51, 234, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(192, 132, 252, 0.3)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  bonusText: {
    fontSize: 14,
    color: '#D8B4FE',
    textAlign: 'center',
  },
  loginLink: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  loginLinkText: {
    color: '#C084FC',
    fontSize: 16,
  },
});