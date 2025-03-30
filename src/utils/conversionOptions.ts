import { ConversionOption, ConversionOptions } from '../types';

export const CONVERSION_OPTIONS: ConversionOptions = {
  spaceNormalization: {
    label: "スペース正規化",
    convert: (text: string): string => text.replace(/　/g, ' ').replace(/ +/g, ' ')
  },
  katakanaToHiragana: {
    label: "カタカナ→ひらがな",
    convert: (text: string): string => text.replace(/[\u30A1-\u30FA]/g, match => 
      String.fromCharCode(match.charCodeAt(0) - 0x60)
    )
  },
  hiraganaToKatakana: {
    label: "ひらがな→カタカナ",
    convert: (text: string): string => text.replace(/[\u3041-\u3096]/g, match => 
      String.fromCharCode(match.charCodeAt(0) + 0x60)
    )
  },
  halfWidthKatakanaToFullWidthKatakana: {
    label: "半角→全角カタカナ",
    convert: (text: string): string => {
      // 基本的な半角→全角カタカナ変換マップ
      const HALF_TO_FULL: Record<string, string> = {
        'ｱ': 'ア', 'ｲ': 'イ', 'ｳ': 'ウ', 'ｴ': 'エ', 'ｵ': 'オ',
        'ｶ': 'カ', 'ｷ': 'キ', 'ｸ': 'ク', 'ｹ': 'ケ', 'ｺ': 'コ',
        'ｻ': 'サ', 'ｼ': 'シ', 'ｽ': 'ス', 'ｾ': 'セ', 'ｿ': 'ソ',
        'ﾀ': 'タ', 'ﾁ': 'チ', 'ﾂ': 'ツ', 'ﾃ': 'テ', 'ﾄ': 'ト',
        'ﾅ': 'ナ', 'ﾆ': 'ニ', 'ﾇ': 'ヌ', 'ﾈ': 'ネ', 'ﾉ': 'ノ',
        'ﾊ': 'ハ', 'ﾋ': 'ヒ', 'ﾌ': 'フ', 'ﾍ': 'ヘ', 'ﾎ': 'ホ',
        'ﾏ': 'マ', 'ﾐ': 'ミ', 'ﾑ': 'ム', 'ﾒ': 'メ', 'ﾓ': 'モ',
        'ﾔ': 'ヤ', 'ﾕ': 'ユ', 'ﾖ': 'ヨ',
        'ﾗ': 'ラ', 'ﾘ': 'リ', 'ﾙ': 'ル', 'ﾚ': 'レ', 'ﾛ': 'ロ',
        'ﾜ': 'ワ', 'ｦ': 'ヲ', 'ﾝ': 'ン',
        'ｧ': 'ァ', 'ｨ': 'ィ', 'ｩ': 'ゥ', 'ｪ': 'ェ', 'ｫ': 'ォ',
        'ｯ': 'ッ', 'ｬ': 'ャ', 'ｭ': 'ュ', 'ｮ': 'ョ', 'ｰ': 'ー'
      };
      
      // 濁点・半濁点の変換マッピング
      const DAKUTEN_MAP: Record<string, string> = {
        'カ': 'ガ', 'キ': 'ギ', 'ク': 'グ', 'ケ': 'ゲ', 'コ': 'ゴ',
        'サ': 'ザ', 'シ': 'ジ', 'ス': 'ズ', 'セ': 'ゼ', 'ソ': 'ゾ',
        'タ': 'ダ', 'チ': 'ヂ', 'ツ': 'ヅ', 'テ': 'デ', 'ト': 'ド',
        'ハ': 'バ', 'ヒ': 'ビ', 'フ': 'ブ', 'ヘ': 'ベ', 'ホ': 'ボ'
      };
      
      const HANDAKUTEN_MAP: Record<string, string> = {
        'ハ': 'パ', 'ヒ': 'ピ', 'フ': 'プ', 'ヘ': 'ペ', 'ホ': 'ポ'
      };
      
      // 文字を一つずつ見ていく
      let result = '';
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const nextChar = text[i + 1];
        
        // 基本的な変換
        const convertedChar = HALF_TO_FULL[char] || char;
        
        // 次の文字が濁点か半濁点かを確認
        if (nextChar === 'ﾞ' && DAKUTEN_MAP[convertedChar]) {
          result += DAKUTEN_MAP[convertedChar];
          i++; // 濁点をスキップ
        } else if (nextChar === 'ﾟ' && HANDAKUTEN_MAP[convertedChar]) {
          result += HANDAKUTEN_MAP[convertedChar];
          i++; // 半濁点をスキップ
        } else {
          result += convertedChar;
        }
      }
      
      return result;
    }
  },
  fullWidthAlphanumericToHalfWidth: {
    label: "全角→半角英数字",
    convert: (text: string): string => {
      return text.replace(/[\uFF01-\uFF5E]/g, s => {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
      });
    }
  },
  removeDuplicateWords: {
    label: "重複単語除去",
    convert: (text: string): string => [...new Set(text.split(/\s+/))].join(' ')
  },
  spaceToNewline: {
    label: "スペース→改行",
    convert: (text: string): string => text.replace(/ /g, '\n')
  },
  sortWordsJapanese: {
    label: "あいうえお順",
    convert: (text: string): string => text.split(/\s+/).sort((a, b) => a.localeCompare(b, 'ja')).join(' ')
  }
};
