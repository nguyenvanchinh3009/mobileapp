import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
  TextInput,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Gamepad2,
  Home,
  Search,
  Trophy,
  User,
  Bell,
  Star,
  Crown,
  TrendingUp,
  Zap,
  Users,
  ChevronRight,
  LogOut,
  Filter,
  Clock,
  Play,
  Download,
  Settings,
  ShoppingBag,
  Gift,
  Target,
  Sparkles,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Types
interface Game {
  id: number;
  title: string;
  category: string;
  rating: number;
  players?: string;
  size?: string;
  image: string;
  isFeatured?: boolean;
  isInstalled?: boolean;
}

interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
  count: number;
}

// Mock data
const userStats = {
  name: 'GamerPro',
  level: 25,
  coins: 3250,
  xp: 1250,
  nextLevelXp: 2000,
  gamesInstalled: 18,
  playTime: '342h',
  achievements: 42,
  rank: 'Diamond III',
};

const featuredGames: Game[] = [
  {
    id: 1,
    title: 'Cyber Arena',
    category: 'Battle Royale',
    rating: 4.9,
    players: '2.4M online',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400',
    isFeatured: true,
    isInstalled: true,
  },
  {
    id: 2,
    title: 'Mythic Legends',
    category: 'MOBA',
    rating: 4.8,
    players: '1.8M online',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400',
    isFeatured: true,
    isInstalled: false,
  },
];

const recentGames: Game[] = [
  {
    id: 3,
    title: 'Shadow Strike',
    category: 'FPS',
    rating: 4.7,
    size: '4.2GB',
    image: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=400',
    isInstalled: true,
  },
  {
    id: 4,
    title: 'Dragon Quest',
    category: 'RPG',
    rating: 4.9,
    size: '8.5GB',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400',
    isInstalled: true,
  },
  {
    id: 5,
    title: 'Racing Fury',
    category: 'Racing',
    rating: 4.6,
    size: '3.1GB',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400',
    isInstalled: false,
  },
  {
    id: 6,
    title: 'Puzzle Master',
    category: 'Puzzle',
    rating: 4.5,
    size: '850MB',
    image: 'https://images.unsplash.com/photo-1618331833071-1c0c6ee3d19e?w=400',
    isInstalled: true,
  },
];

const categories: Category[] = [
  { id: 1, name: 'Battle Royale', icon: '🎯', color: '#EF4444', count: 45 },
  { id: 2, name: 'MOBA', icon: '⚔️', color: '#8B5CF6', count: 32 },
  { id: 3, name: 'RPG', icon: '🧙‍♂️', color: '#10B981', count: 78 },
  { id: 4, name: 'FPS', icon: '🔫', color: '#3B82F6', count: 56 },
  { id: 5, name: 'Racing', icon: '🏎️', color: '#F59E0B', count: 23 },
  { id: 6, name: 'Strategy', icon: '♟️', color: '#EC4899', count: 34 },
];

const dailyRewards = [
  { day: 'Mon', reward: '100', claimed: true },
  { day: 'Tue', reward: '150', claimed: true },
  { day: 'Wed', reward: '200', claimed: true },
  { day: 'Thu', reward: '250', claimed: false },
  { day: 'Fri', reward: '300', claimed: false },
  { day: 'Sat', reward: '500', claimed: false },
  { day: 'Sun', reward: '1000', claimed: false },
];

export default function GameDashboard() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(1);
  const [notifications, setNotifications] = useState(3);

  const handleLogout = () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn có chắc muốn đăng xuất?',
      [
        { text: 'Hủy', style: 'cancel' },
        { 
          text: 'Đăng xuất', 
          style: 'destructive',
          onPress: () => router.push('/')
        }
      ]
    );
  };

  const handlePlayGame = (game: Game) => {
    Alert.alert(
      'Bắt đầu chơi',
      `Khởi chạy ${game.title}?`,
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Chơi ngay', onPress: () => {
          Alert.alert('Thành công', `Đang khởi chạy ${game.title}! 🎮`);
        }}
      ]
    );
  };

  const handleInstallGame = (game: Game) => {
    Alert.alert(
      'Tải game',
      `Tải ${game.title} (${game.size})?`,
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Tải ngay', onPress: () => {
          Alert.alert('Đang tải', `${game.title} đang được tải về... ⏬`);
        }}
      ]
    );
  };

  const claimDailyReward = (dayIndex: number) => {
    const reward = dailyRewards[dayIndex];
    if (!reward.claimed) {
      Alert.alert(
        'Nhận thưởng thành công!',
        `Bạn nhận được ${reward.reward} coins! 🎁`
      );
      // In real app, update state here
    }
  };

  // Calculate XP progress percentage
  const xpPercentage = (userStats.xp / userStats.nextLevelXp) * 100;

  const renderGameCard = (game: Game, isFeatured = false) => (
    <TouchableOpacity 
      style={isFeatured ? styles.featuredGameCard : styles.gameCard}
      onPress={() => isFeatured ? handlePlayGame(game) : null}
    >
      <Image
        source={{ uri: game.image }}
        style={isFeatured ? styles.featuredGameImage : styles.gameImage}
        resizeMode="cover"
      />
      
      {game.isFeatured && (
        <View style={styles.featuredBadge}>
          <Sparkles size={12} color="#FFFFFF" />
          <Text style={styles.featuredBadgeText}>NỔI BẬT</Text>
        </View>
      )}

      <View style={isFeatured ? styles.featuredGameInfo : styles.gameInfo}>
        <View style={styles.gameHeader}>
          <Text style={isFeatured ? styles.featuredGameTitle : styles.gameTitle}>
            {game.title}
          </Text>
          <View style={styles.ratingBadge}>
            <Star size={12} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.ratingText}>{game.rating}</Text>
          </View>
        </View>
        
        <Text style={isFeatured ? styles.featuredGameCategory : styles.gameCategory}>
          {game.category}
        </Text>

        {isFeatured ? (
          <View style={styles.featuredStats}>
            <View style={styles.statItem}>
              <Users size={14} color="#8B5CF6" />
              <Text style={styles.statText}>{game.players}</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.gameSize}>{game.size}</Text>
        )}

        <TouchableOpacity
          style={[
            styles.actionButton,
            game.isInstalled ? styles.playButton : styles.installButton
          ]}
          onPress={() => game.isInstalled ? handlePlayGame(game) : handleInstallGame(game)}
        >
          {game.isInstalled ? (
            <>
              <Play size={16} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>CHƠI NGAY</Text>
            </>
          ) : (
            <>
              <Download size={16} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>TẢI VỀ</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />
      
      {/* Top Navigation */}
      <View style={styles.topNav}>
        <View style={styles.userSection}>
          <View style={styles.userAvatar}>
            <Text style={styles.userAvatarText}>
              {userStats.name.charAt(0)}
            </Text>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>{userStats.level}</Text>
            </View>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userStats.name}</Text>
            <View style={styles.rankBadge}>
              <Trophy size={12} color="#F59E0B" />
              <Text style={styles.rankText}>{userStats.rank}</Text>
            </View>
          </View>
        </View>

        <View style={styles.topNavActions}>
          <TouchableOpacity style={styles.navActionButton}>
            <ShoppingBag size={24} color="#E2E8F0" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navActionButton}>
            <Bell size={24} color="#E2E8F0" />
            {notifications > 0 && (
              <View style={styles.notificationDot} />
            )}
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navActionButton}
            onPress={() => router.push('/profile')}
          >
            <Settings size={24} color="#E2E8F0" />
          </TouchableOpacity>
        </View>
      </View>

      {/* XP Progress Bar */}
      <View style={styles.xpContainer}>
        <View style={styles.xpHeader}>
          <Text style={styles.xpTitle}>Level {userStats.level}</Text>
          <Text style={styles.xpCount}>{userStats.xp}/{userStats.nextLevelXp} XP</Text>
        </View>
        <View style={styles.xpBar}>
          <View 
            style={[styles.xpProgress, { width: `${Math.min(xpPercentage, 100)}%` }]} 
          />
        </View>
        <View style={styles.coinDisplay}>
          <Crown size={16} color="#F59E0B" />
          <Text style={styles.coinText}>{userStats.coins}</Text>
          <Text style={styles.coinLabel}>Coins</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm game, bạn bè..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#8B5CF6" />
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <Gamepad2 size={24} color="#8B5CF6" />
            <Text style={styles.statCardNumber}>{userStats.gamesInstalled}</Text>
            <Text style={styles.statCardLabel}>Game</Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <Clock size={24} color="#10B981" />
            <Text style={styles.statCardNumber}>{userStats.playTime}</Text>
            <Text style={styles.statCardLabel}>Chơi</Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <Target size={24} color="#EF4444" />
            <Text style={styles.statCardNumber}>{userStats.achievements}</Text>
            <Text style={styles.statCardLabel}>Thành tựu</Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: '#1E293B' }]}>
            <TrendingUp size={24} color="#F59E0B" />
            <Text style={styles.statCardNumber}>#{userStats.rank.split(' ')[1]}</Text>
            <Text style={styles.statCardLabel}>Hạng</Text>
          </View>
        </View>

        {/* Daily Rewards */}
        <View style={styles.dailyRewardsSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Gift size={20} color="#F59E0B" />
              <Text style={styles.sectionTitle}>Thưởng Hàng Ngày</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Tuần này</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.rewardsContainer}>
            {dailyRewards.map((reward, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.rewardDay,
                  reward.claimed && styles.rewardDayClaimed
                ]}
                onPress={() => claimDailyReward(index)}
              >
                <Text style={styles.rewardDayName}>{reward.day}</Text>
                <View style={[
                  styles.rewardCircle,
                  reward.claimed && styles.rewardCircleClaimed
                ]}>
                  <Text style={styles.rewardAmount}>{reward.reward}</Text>
                  <Crown size={10} color="#F59E0B" />
                </View>
                <Text style={styles.rewardLabel}>Coins</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Games */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Game Đang Hot</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>Tất cả</Text>
              <ChevronRight size={16} color="#8B5CF6" />
            </TouchableOpacity>
          </View>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredGamesScroll}
          >
            {featuredGames.map(game => renderGameCard(game, true))}
          </ScrollView>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Thể Loại</Text>
          </View>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {categories.map(category => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  { borderColor: category.color },
                  activeCategory === category.id && { backgroundColor: `${category.color}20` }
                ]}
                onPress={() => setActiveCategory(category.id)}
              >
                <Text style={[styles.categoryIcon, { fontSize: 28 }]}>
                  {category.icon}
                </Text>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryCount}>{category.count}+</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recent Games */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Game Của Bạn</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>Xem thêm</Text>
              <ChevronRight size={16} color="#8B5CF6" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.gamesGrid}>
            {recentGames.map(game => (
              <View key={game.id} style={styles.gameGridItem}>
                {renderGameCard(game, false)}
              </View>
            ))}
          </View>
        </View>

        {/* Bottom Space */}
        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={[styles.bottomNavItem, styles.bottomNavItemActive]}>
          <Home size={24} color="#8B5CF6" />
          <Text style={styles.bottomNavTextActive}>Trang chủ</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.bottomNavItem}>
          <Gamepad2 size={24} color="#9CA3AF" />
          <Text style={styles.bottomNavText}>Khám phá</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.bottomNavItem}>
          <Trophy size={24} color="#9CA3AF" />
          <Text style={styles.bottomNavText}>Xếp hạng</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.bottomNavItem}>
          <User size={24} color="#9CA3AF" />
          <Text style={styles.bottomNavText}>Tôi</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.bottomNavItem}
          onPress={handleLogout}
        >
          <LogOut size={24} color="#EF4444" />
          <Text style={styles.bottomNavTextLogout}>Thoát</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  scrollContent: {
    paddingBottom: 90,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  userAvatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  levelBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#EF4444',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0F172A',
  },
  levelText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  userInfo: {
    gap: 4,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  rankBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
    alignSelf: 'flex-start',
  },
  rankText: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '600',
  },
  topNavActions: {
    flexDirection: 'row',
    gap: 12,
  },
  navActionButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  xpContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  xpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  xpTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  xpCount: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  xpBar: {
    height: 8,
    backgroundColor: '#374151',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  xpProgress: {
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 4,
  },
  coinDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  coinText: {
    color: '#F59E0B',
    fontSize: 18,
    fontWeight: 'bold',
  },
  coinLabel: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    marginHorizontal: 20,
    marginVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 16,
    color: '#FFFFFF',
    fontSize: 16,
  },
  filterButton: {
    padding: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    width: (width - 52) / 2,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    gap: 8,
  },
  statCardNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statCardLabel: {
    fontSize: 12,
    color: '#94A3B8',
  },
  dailyRewardsSection: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    color: '#8B5CF6',
    fontSize: 14,
    fontWeight: '500',
  },
  rewardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  rewardDay: {
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 12,
  },
  rewardDayClaimed: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  rewardDayName: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  rewardCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#374151',
  },
  rewardCircleClaimed: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderColor: '#10B981',
  },
  rewardAmount: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  rewardLabel: {
    fontSize: 10,
    color: '#94A3B8',
  },
  featuredGamesScroll: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  featuredGameCard: {
    width: width * 0.8,
    marginRight: 16,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderWidth: 1,
    borderColor: '#374151',
  },
  featuredGameImage: {
    width: '100%',
    height: 180,
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 92, 246, 0.8)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  featuredBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  featuredGameInfo: {
    padding: 16,
  },
  gameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  featuredGameTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '600',
  },
  featuredGameCategory: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  featuredStats: {
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    color: '#E2E8F0',
    fontSize: 12,
  },
  categoriesScroll: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  categoryCard: {
    width: 100,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
  },
  categoryIcon: {
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  categoryCount: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  gamesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
  },
  gameGridItem: {
    width: (width - 52) / 2,
  },
  gameCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#374151',
  },
  gameImage: {
    width: '100%',
    height: 120,
  },
  gameInfo: {
    padding: 12,
  },
  gameTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  gameCategory: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  gameSize: {
    fontSize: 11,
    color: '#94A3B8',
    marginBottom: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderRadius: 12,
  },
  playButton: {
    backgroundColor: '#8B5CF6',
  },
  installButton: {
    backgroundColor: '#10B981',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  bottomSpace: {
    height: 20,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomNavItem: {
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  bottomNavItemActive: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderRadius: 12,
  },
  bottomNavText: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  bottomNavTextActive: {
    fontSize: 10,
    color: '#8B5CF6',
    fontWeight: 'bold',
  },
  bottomNavTextLogout: {
    fontSize: 10,
    color: '#EF4444',
  },
});