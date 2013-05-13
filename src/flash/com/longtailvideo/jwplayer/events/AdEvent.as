package com.longtailvideo.jwplayer.events
{
	public class AdEvent extends PlayerEvent
	{
		
		public static var JWPLAYER_AD_TIME:String = "jwplayerAdTime";
		public static var JWPLAYER_AD_ERROR:String = "jwplayerAdError";
		public static var JWPLAYER_AD_CLICK:String = "jwplayerAdClicked";
		public static var JWPLAYER_AD_COMPLETE:String = "jwplayerAdComplete";
		public static var JWPLAYER_AD_IMPRESSION:String = "jwplayerAdImpression";
		public static var JWPLAYER_AD_COMPANIONS:String = "jwplayerAdCompanions";
		
		
		public var duration:Number 			= -1;
		public var position:Number 			= -1;
		public var tag:String;
		
		public function AdEvent(type:String, msg:String=undefined)
		{
			super(type, msg);
		}
	}
}