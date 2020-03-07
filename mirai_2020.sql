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

 Date: 07/03/2020 01:58:41
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tbl_chatlog
-- ----------------------------
DROP TABLE IF EXISTS `tbl_chatlog`;
CREATE TABLE `tbl_chatlog`  (
  `id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT,
  `chat_id` int(11) NULL DEFAULT NULL,
  `answer` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `answer_id` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `chat_in_out` int(255) NULL DEFAULT NULL,
  `chat_step_id` int(11) NULL DEFAULT NULL,
  `created_at` timestamp(6) NULL DEFAULT NULL,
  `deleted_at` timestamp(6) NULL DEFAULT NULL,
  `updated_at` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 242 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of tbl_chatlog
-- ----------------------------

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
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of tbl_horoscopes
-- ----------------------------
INSERT INTO `tbl_horoscopes` VALUES (1, 'aries', '牡羊座', '2020-03-21 00:00:00.000000', '2020-04-19 00:00:00.000000', '低調運。思わせぶりな異性に振り回されて疲れてしまいそう。今日は相手のペースに乗らないでちょっと距離を取った方が良いでしょう。', '自重運。上司からお叱りを受ける場面があるかも。今日は対人関係に波乱の兆しがあるので、電話や来局対応には気を抜かないで。', '波乱運。考えなきゃいけないことが多くて眠れないかも。お風呂でゆっくり身体を温めて、鎮静効果のあるハーブティーでも飲んでリラックスして。');
INSERT INTO `tbl_horoscopes` VALUES (2, 'taurus', '牡牛座', '2020-04-20 00:00:00.000000', '2020-05-20 00:00:00.000000', '好調運。コンサートやアート展などで出会った異性と縁がある予感。また会いたいなと思ったらメールアドレスの交換を。', '快調運。同僚とのコミュニケーションが順調、協力して取り組む作業が吉。想像以上の完成度になりそうです。', '平凡・安定運。今日のポイントは目元。目力アップが期待できるマッサージ、瞳の魅力が強調される表情やヘアメイクを研究してみましょう。');
INSERT INTO `tbl_horoscopes` VALUES (3, 'gemini', '双子座', '2020-05-21 00:00:00.000000', '2020-06-20 00:00:00.000000', '好調運。とても華やかな魅力に溢れているとき。年上からアプローチされそうです。細やかな気配りで好感度アップを狙うと良いでしょう。', '平凡・安定運。いつもの仕事もひとつひとつ丁寧に仕上げる事で周囲からの評価がグンと上がります。机周りに花や写真を飾ると吉。', '吉凶混合運。今日は歌を歌ったり、ボイストレーニングをするとストレス発散に効果的。ただし、やり過ぎて喉を傷めないよう注意。');
INSERT INTO `tbl_horoscopes` VALUES (4, 'cancer', '蟹座', '2020-06-21 00:00:00.000000', '2020-07-22 00:00:00.000000', '好調運。ようやく過去の恋も忘れられそう。今日は新しい出会いが待っている予感があるので、積極的に恋を探してみよう。', '好調運。あなたの能力に期待が集まるとき。新しいプロジェクトのリーダーに抜擢される可能性が。自信を持って引き受けよう。', '好調運。健康への関心が高まる日。新しい健康法を見つけたら、迷わず試してみると◎　予想以上に効果がありそう。');
INSERT INTO `tbl_horoscopes` VALUES (5, 'leo', '獅子座', '2020-07-23 00:00:00.000000', '2020-08-22 00:00:00.000000', '自重運。八方美人な態度が誤解を与えそう。思わせぶりな言動をすると、好きでもない異性から言いよられて困った事になるので注意。', '低調運。あなたの甘い部分をズバリ指摘され落ち込みそう。言ってくれる人がいるのは幸せなこと。自分を成長させる機会と思って向き合って。', '低調運。いつもは楽しく人と会えるのに今日はとてつもなく面倒になりそう。リスケできるなら、調整して自分のケアに時間をかけて。');
INSERT INTO `tbl_horoscopes` VALUES (6, 'virgo', '乙女座', '2020-08-23 00:00:00.000000', '2020-09-22 00:00:00.000000', '快調運。未来の恋人はかなり近くにいる予感。同僚や幼なじみとの交流に、恋の可能性を感じそう。同窓会も◎。', '好調運。初めて取り組む作業には、前向きに挑戦するのが◎。やり遂げたときに大きな成長を実感できるはずです。', '好調運。ダイエットが波に乗っているとき。健康的な美を手に入れるなら、基礎体力作りに励むのが近道です。');
INSERT INTO `tbl_horoscopes` VALUES (7, 'libra', '天秤座', '2020-09-23 00:00:00.000000', '2020-10-22 00:00:00.000000', '波乱運。嫉妬心から間違った判断をしてしまうかも。感情的にならず、相手と向き合うときは冷静に、落ち着いた態度で素直に話しましょう。', '吉凶混合運。上司との仲がイマイチでも、重要なことはきちんと相談を。会話がきっかけで関係が改善するかもしれません。', '波乱運。ダイエットが停滞期に入り、思い悩んでしまいそう。ここはプロのトレーナーにお願いして、状況を打破できるよう手を打ちましょう！');
INSERT INTO `tbl_horoscopes` VALUES (8, 'scorpio', '蠍座', '2020-10-23 00:00:00.000000', '2020-11-21 00:00:00.000000', '快調運。新しい恋にも迷うことなくと飛び込んでいけるはず。行動範囲を広げるとハッピーに。いつになく積極的に恋を進められるとき。', '快調運。思っている以上に効率よくマスターできる日。自信にも繋がるので、新しい業務を始めるのにいいときになるかも。', '好調運。ヒップアップなど下半身のエクササイズに効果が期待出来そう。筋力アップで基礎代謝も活発に。さっそくトライしてみよう。');
INSERT INTO `tbl_horoscopes` VALUES (9, 'sagittarius', '射手座', '2020-11-22 00:00:00.000000', '2020-12-21 00:00:00.000000', '吉凶混合運。新しい恋の到来！　でも、過去の恋愛のトラウマがうずいて臆病になってしまうかも。過去は過去と割り切って今を生きて。', '自重運。ゴーサインが出ていた案件に急にストップがかかるなど、予期せぬ事態が起きそう。より良い仕事にする試練だと思いましょう。', '自重運。自然の中を歩いてみるとリセットできそう。心の疲れは、美容にも健康にも悪影響です。早めにケアを。');
INSERT INTO `tbl_horoscopes` VALUES (10, 'capricorn', '山羊座', '2020-12-22 00:00:00.000000', '2020-01-19 00:00:00.000000', '平凡・安定運。紹介や合コン、グループでのパーティーなど、即決で参加を。恋の相談は友達にするのが◎です。', '自重運。気が拡散しているとき。様々なアイデアを取り入れすぎな傾向が。会議などの場では自分の意見をまとめて。', '吉凶混合運。周囲との関係も良好で心穏やかに過ごせそう。どんな時もいつも笑顔でいられれば、周りに影響されることが少なくなるはず。');
INSERT INTO `tbl_horoscopes` VALUES (11, 'aquarius', '水瓶座', '2020-01-20 00:00:00.000000', '2020-02-18 00:00:00.000000', '自重運。いろんな人と仲よくできるときですが、八方美人に見られがち。気になる人には特別な対応を心がけ、きちんと好意を示して。', '吉凶混合運。指示の出し方がやや乱暴になりがちなので注意。とくに後輩には丁寧な説明が必要です。自分の仕事は捗ります。', '波乱運。ダイエットだからと、サプリメントに頼りすぎはNG。主役は食事と運動です。サプリは補助だと考えて。');
INSERT INTO `tbl_horoscopes` VALUES (12, 'pisces', '魚座', '2020-02-19 00:00:00.000000', '2020-03-20 00:00:00.000000', '快調運。恋の理想が高ければ高いほど、あなたの魅力も輝きそうな日。高嶺の花的な異性にもアプローチしてみるのもよさそう。', '好調運。面倒なことも率先して取り組み、チームの士気を高めていきたいとき。あなたのやる気が、周囲によい影響を与えそう。', '快調運。体力気力共に充実しています。いつもより睡眠時間が足りなくても大丈夫、支障なくキビキビ動けますよ。');

-- ----------------------------
-- Table structure for tbl_steps
-- ----------------------------
DROP TABLE IF EXISTS `tbl_steps`;
CREATE TABLE `tbl_steps`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `step_text` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `step_en` tinytext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `step_input_type` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `step_message_type` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `step_placeholder` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `step_option_list` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `step_gallery_list` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `step_article_list` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of tbl_steps
-- ----------------------------
INSERT INTO `tbl_steps` VALUES (1, 'こんにちは。アプリダウンロードありがとうございます。 私の名前はミライです。 あなたの毎日をHAPPYにする情報をいち早くお伝えいたします。 人生が楽しく、そして快適に過ごせるように・・・全力でお手伝いいたします。 どうぞよろしくお願いいたします。', 'Hello. Thank you for downloading the app. My name is Mirai. I will tell you the information to make your everyday HAPPY. We will do our best to make your life enjoyable and comfortable. Thank you very much.', 'text', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tbl_steps` VALUES (2, 'あなたにとってぴったりなサロンをお探しするために、\r\nあなたについて教えてください。入力は１回だけ、\r\nすぐ終わります。', 'To find the perfect salon for you,\r\nTell me about you. Input only once,\r\nEnds soon.', 'text', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tbl_steps` VALUES (3, 'あなたのお名前は？ ファーストネーム ', 'What is your name? First name', 'input', NULL, 'ファーストネーム ', NULL, NULL, NULL);
INSERT INTO `tbl_steps` VALUES (4, 'あなたのお名前は？ 苗字', 'What is your name? Last name', 'input', NULL, '苗字', NULL, NULL, NULL);
INSERT INTO `tbl_steps` VALUES (5, 'とっても可愛いお名前ですね。 ニックネームはありますか？', 'It is a very cute name. Do you have a nickname?', 'option', NULL, NULL, '[{\"key\" : \"0\", \"value\" : \"はい\"}, {\"key\" : \"1\", \"value\" : \"いいえ\"}]', NULL, NULL);
INSERT INTO `tbl_steps` VALUES (6, 'ニックネームは何ですか？', 'What is a nickname?', 'input', NULL, 'ニックネーム', NULL, NULL, NULL);
INSERT INTO `tbl_steps` VALUES (7, 'あなたの誕生日に特別なメッセージをお送りできたらと思います。 お誕生日を教えていただけますか', 'I would like to send you a special message for your birthday. Could you tell me your birthday', 'input', 'date', 'お誕生日', NULL, NULL, NULL);
INSERT INTO `tbl_steps` VALUES (8, 'そうなんですね。あなたは(Horoscope)ですね。 今日の(Horoscope)の運勢は.... (horoscope_content)  このように出ていますよ。星座占いが毎日配信されるとしたら、興味はありますか？その日の運勢をお伝えします！ 結構当たると評判なんです。', 'That\'s right. You are (Horoscope). The fortune of (Horoscope) today .... (horoscope_content) Would you be interested if constellations were delivered every day? I will tell you the fortune of the day! It is a reputation when it hits quite well.', 'option', NULL, NULL, '[{\"key\" : \"0\", \"value\" : \"はい\"}, {\"key\" : \"1\", \"value\" : \"いいえ\"}]', NULL, NULL);
INSERT INTO `tbl_steps` VALUES (9, 'あなたの電話番号を教えてください。\r\nサロンから緊急連絡がある際の連絡に使用します。', 'Please give your phone number. Used for emergency contact from the salon.', 'input', 'tel', '電話番号', NULL, NULL, NULL);
INSERT INTO `tbl_steps` VALUES (10, 'ありがとうございます。アドレスも教えてもらえますか？', 'Thank you very much. Can you give me your email?', 'input', 'email', '電子メールアドレス', NULL, NULL, NULL);
INSERT INTO `tbl_steps` VALUES (11, '次はロケーションについて。ご自宅の郵便番号を教えてください。', 'Next is location. Please tell me your zip code.', 'input', 'postalcode', '郵便番号', NULL, NULL, NULL);
INSERT INTO `tbl_steps` VALUES (12, 'あなたはサロンワークをしていますか？それとも美容に興味があるだけ？', 'Are you doing salon work? Or are you just interested in beauty?', 'option', NULL, NULL, '[{\"key\" : \"0\", \"value\" : \"美容が好きなだけ\"}, {\"key\" : \"1\", \"value\" : \"サロンワークをしています\"}]', NULL, NULL);
INSERT INTO `tbl_steps` VALUES (13, 'どんなジャンルですか？', 'What genre is it?', 'option', NULL, NULL, '[{\"key\" : \"0\", \"value\" : \"ネイリスト\"}, {\"key\" : \"1\", \"value\" : \"アイリスト\"}, {\"key\" : \"2\", \"value\" : \"エステティシャン\"}, {\"key\" : \"3\", \"value\" : \"ヘアスタイリスト\"}]', NULL, NULL);
INSERT INTO `tbl_steps` VALUES (14, 'どんなトピックに興味がありますか？', 'What topics are you interested in?', 'multiple', NULL, NULL, '[{\"key\" : \"0\", \"value\" : \"コスメ・最新美容情報\"}, {\"key\" : \"1\", \"value\" : \"ネイル・アイラッシュ\"}, {\"key\" : \"2\", \"value\" : \"恋愛\"}, {\"key\" : \"3\", \"value\" : \"スピリチュアル\"}]', NULL, NULL);
INSERT INTO `tbl_steps` VALUES (15, 'ありがとうございます！あなたの関心ある分野にぴったりな情報をお送りしますね！どうぞ楽しんで！', 'Thank you! We\'ll send you the right information for your area of interest! Have fun!', 'article', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tbl_steps` VALUES (16, 'お元気ですか！ ありがとうございます！あなたの関心ある分野にぴったりな情報をお送りしますね！どうぞ楽しんで！', 'We\'ll send you the right information for your area of interest! Have fun!', 'article', NULL, NULL, NULL, NULL, NULL);

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
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbl_user
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
