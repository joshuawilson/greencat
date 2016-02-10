/*******************************************************************************
 * Copyright (c) 2016 Red Hat, Inc.
 * Distributed under license by Red Hat, Inc. All rights reserved.
 * This program is made available under the terms of the
 * Eclipse Public License v1.0 which accompanies this distribution,
 * and is available at http://www.eclipse.org/legal/epl-v10.html
 *
 *  Contributors:
 *       Red Hat, Inc. - initial API and implementation
 *******************************************************************************/
package org.GreenCat.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;

import org.jsoup.Jsoup;


/**
 * A utility class to retrieve HTML page content
 * 
 * @author Victor Rubezhny
 */
public class HTMLReader {
	private static final String EMPTY = "";
	
	/**
	 * Reads a Web Page into an HTML String by a given URL
	 * 
	 * @param url - URL of web page to read
	 * @return String HTML returned by a web server
	 */
    public static String readHTML(String url) {
    	StringBuffer sb = new StringBuffer(1000);
        URL anURL;
		try {
			anURL = new URL(url);
		} catch (MalformedURLException e) {
			e.printStackTrace();
			return EMPTY;
		}

		BufferedReader in = null;
        String inputLine;
        try {
			in = new BufferedReader(
			new InputStreamReader(anURL.openStream()));

			while ((inputLine = in.readLine()) != null) {
				sb.append(inputLine);
			}
		} catch (IOException e) {
			e.printStackTrace();
			return EMPTY;
		} finally {
			if (in != null) {
				try {
					in.close();
				} catch (IOException e) {
					// Ignore
				}
			}
		}
        return sb.toString();
    }
 
	/**
	 * Reads a Plain Text from Web Page HTML into a String by a given URL
	 * 
	 * @param url - URL of web page to read
	 * @return String Pain Text from an HTML page returned by a web server
	 */
    public static String readHTMLAsText(String url) {
    	try {
			return Jsoup.parse(readHTML(url)).text();
		} catch (Exception e) {
			e.printStackTrace();
	    	return EMPTY;
		}
    }
}
