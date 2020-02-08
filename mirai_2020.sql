/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 100138
 Source Host           : localhost:3306
 Source Schema         : mirai_2020

 Target Server Type    : MySQL
 Target Server Version : 100138
 File Encoding         : 65001

 Date: 08/02/2020 05:11:08
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tbl_articles
-- ----------------------------
DROP TABLE IF EXISTS `tbl_articles`;
CREATE TABLE `tbl_articles`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `summary` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `article_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `thumbnail_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `created_at` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `deleted_at` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for tbl_chatlog
-- ----------------------------
DROP TABLE IF EXISTS `tbl_chatlog`;
CREATE TABLE `tbl_chatlog`  (
  `id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT,
  `chat_id` int(11) NULL DEFAULT NULL,
  `answer` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `answer_id` int(11) NULL DEFAULT NULL,
  `chat_in_out` int(255) NULL DEFAULT NULL,
  `chat_step_id` int(11) NULL DEFAULT NULL,
  `created_at` timestamp(6) NULL DEFAULT NULL,
  `deleted_at` timestamp(6) NULL DEFAULT NULL,
  `updated_at` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 81 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for tbl_horoscopes
-- ----------------------------
DROP TABLE IF EXISTS `tbl_horoscopes`;
CREATE TABLE `tbl_horoscopes`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name_en` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `name_jp` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `start_date` timestamp(6) NULL DEFAULT NULL,
  `end_date` timestamp(6) NULL DEFAULT NULL,
  `love_luck` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `work_study` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `healthy_beauty` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for tbl_steps
-- ----------------------------
DROP TABLE IF EXISTS `tbl_steps`;
CREATE TABLE `tbl_steps`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `step_text` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `step_en` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `step_input_type` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `step_message_type` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `step_placeholder` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `step_option_list` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `step_gallery_list` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `step_article_list` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of tbl_steps
-- ----------------------------
INSERT INTO `tbl_steps` VALUES (1, 'こんにちは。アプリダウンロードありがとうございます。 私の名前はミライです。 あなたの毎日をHAPPYにする情報をいち早くお伝えいたします。 人生が楽しく、そして快適に過ごせるように・・・全力でお手伝いいたします。 どうぞよろしくお願いいたします。', 'Hello. Thank you for downloading the app. My name is Mirai. I will tell you the information to make your everyday HAPPY. We will do our best to make your life enjoyable and comfortable. Thank you very much.', 'text', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tbl_steps` VALUES (2, 'あなたにとってぴったりなサロンをお探しするために、\r\nあなたについて教えてください。入力は１回だけ、\r\nすぐ終わります。', 'To find the perfect salon for you,\r\nTell me about you. Input only once,\r\nEnds soon.', 'text', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tbl_steps` VALUES (3, 'あなたのお名前は？ 氏 名', 'What is your name? Full name', 'input', NULL, '氏 名', NULL, NULL, NULL);
INSERT INTO `tbl_steps` VALUES (4, 'とっても可愛いお名前ですね。 ニックネームはありますか？', 'It is a very cute name. Do you have a nickname?', 'option', NULL, NULL, '[{\"key\" : \"0\", \"value\" : \"はい\"}, {\"key\" : \"1\", \"value\" : \"いいえ\"}]', NULL, NULL);
INSERT INTO `tbl_steps` VALUES (5, 'ニックネームは何ですか？', 'What is a nickname?', 'input', NULL, 'ニックネーム', NULL, NULL, NULL);
INSERT INTO `tbl_steps` VALUES (6, 'あなたの誕生日に特別なメッセージをお送りできたらと思います。 お誕生日を教えていただけますか', 'I would like to send you a special message for your birthday. Could you tell me your birthday', 'input', 'date', 'お誕生日', NULL, NULL, NULL);
INSERT INTO `tbl_steps` VALUES (7, 'そうなんですね。あなたは(Horoscope)ですね。 今日の(Horoscope)の運勢は.... (horoscope_content)  このように出ていますよ。星座占いが毎日配信されるとしたら、興味はありますか？その日の運勢をお伝えします！ 結構当たると評判なんです。', 'That\'s right. You are (Horoscope). The fortune of (Horoscope) today ...\r\n(horoscope_content)\r\nIt comes out like this. Would you be interested if the constellations were delivered daily? I will tell you the fortune of the day! It is a reputation when it hi', 'option', NULL, NULL, '[{\"key\" : \"0\", \"value\" : \"はい\"}, {\"key\" : \"1\", \"value\" : \"いいえ\"}]', NULL, NULL);
INSERT INTO `tbl_steps` VALUES (8, 'あなたの電話番号を教えてください。\r\nサロンから緊急連絡がある際の連絡に使用します。', 'Please give your phone number. Used for emergency contact from the salon.', 'input', 'tel', '電話番号', NULL, NULL, NULL);
INSERT INTO `tbl_steps` VALUES (9, 'ありがとうございます。アドレスも教えてもらえますか？', 'Thank you very much. Can you give me your email?', 'input', 'email', '電子メールアドレス', NULL, NULL, NULL);
INSERT INTO `tbl_steps` VALUES (10, '次はロケーションについて。ご自宅の郵便番号を教えてください。', 'Next is location. Please tell me your zip code.', 'input', 'postalcode', '郵便番号', NULL, NULL, NULL);
INSERT INTO `tbl_steps` VALUES (11, 'あなたはサロンワークをしていますか？それとも美容に興味があるだけ？', 'Are you doing salon work? Or are you just interested in beauty?', 'option', NULL, NULL, '[{\"key\" : \"0\", \"value\" : \"美容が好きなだけ\"}, {\"key\" : \"1\", \"value\" : \"サロンワークをしています\"}]', NULL, NULL);
INSERT INTO `tbl_steps` VALUES (12, 'どんなジャンルですか？', 'What genre is it?', 'option', NULL, NULL, '[{\"key\" : \"0\", \"value\" : \"ネイリスト\"}, {\"key\" : \"1\", \"value\" : \"アイリスト\"}, {\"key\" : \"2\", \"value\" : \"エステティシャン\"}, {\"key\" : \"3\", \"value\" : \"ヘアスタイリスト\"}]', NULL, NULL);
INSERT INTO `tbl_steps` VALUES (13, 'どんなトピックに興味がありますか？', 'What topics are you interested in?', 'option', NULL, NULL, '[{\"key\" : \"0\", \"value\" : \"コスメ・最新美容情報\"}, {\"key\" : \"1\", \"value\" : \"ネイル・アイラッシュ\"}, {\"key\" : \"2\", \"value\" : \"恋愛\"}, {\"key\" : \"3\", \"value\" : \"スピリチュアル\"}]', NULL, NULL);
INSERT INTO `tbl_steps` VALUES (14, 'ありがとうございます！あなたの関心ある分野にぴったりな情報をお送りしますね！どうぞ楽しんで！', 'Thank you! We\'ll send you the right information for your area of interest! Have fun!', 'article', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tbl_steps` VALUES (15, 'お元気ですか！ ありがとうございます！あなたの関心ある分野にぴったりな情報をお送りしますね！どうぞ楽しんで！', 'We\'ll send you the right information for your area of interest! Have fun!', 'article', NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for tbl_user
-- ----------------------------
DROP TABLE IF EXISTS `tbl_user`;
CREATE TABLE `tbl_user`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `last_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `full_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `nick_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `birth` timestamp(6) NULL DEFAULT NULL,
  `tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `zip_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `prefecture` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `city` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `job` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `favorite_topic` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `device_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `device_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `ip` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `daily_horoscope` int(11) NULL DEFAULT NULL,
  `last_visited` timestamp(6) NULL DEFAULT NULL,
  `chat_id` int(11) NULL DEFAULT NULL,
  `step_id` int(11) NULL DEFAULT NULL,
  `created_at` timestamp(6) NULL DEFAULT NULL,
  `updated_at` timestamp(6) NULL DEFAULT NULL,
  `deleted_at` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

SET FOREIGN_KEY_CHECKS = 1;
