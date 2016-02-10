package org.GreenCat.logic;

import java.util.ArrayList;
import java.util.Arrays;

import org.junit.Assert;
import org.junit.Test;


public class WordStatisticsTest {

	@Test
	public void testGetWordCounts() throws Exception {
		Stats stats = WordStatistics.getWordCounts("a nice word word", new ArrayList<>());
		Assert.assertEquals(Integer.valueOf(4), stats.numberofWordsOnPage);
		Assert.assertEquals(Integer.valueOf(2), stats.wordCounts.get("word"));
		
	}

	@Test
	public void testAccentedWord() throws Exception {
		Stats stats = WordStatistics.getWordCounts("an accent\u00e9d word", new ArrayList<>());
		Assert.assertEquals(Integer.valueOf(1), stats.wordCounts.get("accent\u00e9d"));
		
	}
	
	@Test
	public void testFilteredWords() throws Exception {
		Stats stats = WordStatistics.getWordCounts("<html><head></head><body><p>this is a test</p></body></html>", Arrays.asList("html","head","body","p"));
		Assert.assertEquals(Integer.valueOf(4), stats.numberofWordsOnPage);		
	}

	@Test
	public void testMixedCaseWords() throws Exception {
		Stats stats = WordStatistics.getWordCounts("miXed cAse MIXed case mixed CASE MIXEd CAsE", Arrays.asList("html","head","body","p"));
		Assert.assertEquals(Integer.valueOf(8), stats.numberofWordsOnPage);		
		Assert.assertEquals(Integer.valueOf(4), stats.wordCounts.get("mixed"));
		Assert.assertEquals(Integer.valueOf(4), stats.wordCounts.get("case"));
	}

}
