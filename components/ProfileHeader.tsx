import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

type Props = {
  name: string
  bio: string
  avatar: string
  recipes: number
  videos: number
  followers: number
  following: number
  activeTab: 'video' | 'recipe'
  onTabChange: (tab: 'video' | 'recipe') => void
  onEdit: () => void
}

const ProfileHeader = ({
  name,
  bio,
  avatar,
  recipes,
  videos,
  followers,
  following,
  activeTab,
  onTabChange,
  onEdit
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <TouchableOpacity style={styles.editBtn} onPress={onEdit}>
          <Text style={styles.editText}>Edit profile</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.name}>{name}</Text>
      <Text style={styles.bio}>{bio}</Text>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{recipes}</Text>
          <Text style={styles.statLabel}>Recipe</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{videos}</Text>
          <Text style={styles.statLabel}>Videos</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{followers}K</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{following}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => onTabChange('video')}>
          <Text style={[styles.tab, activeTab === 'video' && styles.activeTab]}>Video</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTabChange('recipe')}>
          <Text style={[styles.tab, activeTab === 'recipe' && styles.activeTab]}>Recipe</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ProfileHeader

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 30
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  editBtn: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12
  },
  editText: {
    fontSize: 12,
    color: '#333'
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10
  },
  bio: {
    fontSize: 13,
    color: '#555',
    marginTop: 5
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20
  },
  stat: {
    alignItems: 'center'
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  statLabel: {
    fontSize: 12,
    color: '#777'
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    paddingBottom: 10
  },
  tab: {
    fontSize: 14,
    color: '#999'
  },
  activeTab: {
    color: '#ff4d4d',
    fontWeight: 'bold'
  }
})
