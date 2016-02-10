package org.GreenCat.rest;

import java.util.ArrayList;

import javax.ejb.Stateless;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.GreenCat.logic.WordStatistics;
import org.GreenCat.util.HTMLReader;

/**
 * 
 */
@Stateless
@Path("/statistics")
public class StatsEndpoint {

	@GET
	@Produces("application/json")
	public Response statsByUrl(@PathParam("url") String url) {
		String text = HTMLReader.readHTMLAsText(url);
		org.GreenCat.logic.Stats stats = WordStatistics.getWordCounts(text, new ArrayList<>());
		
		return Response.ok(stats).build();
	}
}
