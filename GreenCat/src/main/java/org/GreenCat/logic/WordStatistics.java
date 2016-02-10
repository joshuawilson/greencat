package org.GreenCat.logic;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class WordStatistics {
	public static Stats getWordCounts(String document, List<String> filteredWords)
	{
		Stats stats = new Stats();
		stats.wordCounts = new HashMap<String, Integer>();
		Pattern pattern = Pattern.compile("\\p{L}+");
		Matcher matcher = pattern.matcher(document.toLowerCase());
		while (matcher.find())
		{
			String word = matcher.group();
			if (!filteredWords.contains(word)) {
				stats.numberofWordsOnPage++;
				if (stats.wordCounts.containsKey(word))
					stats.wordCounts.put(word, stats.wordCounts.get(word)+1);
				else stats.wordCounts.put(word, 1);
			}
		}
		return stats;
	}
	
}